export function parseYaml(yamlString: string): any {
  if (!yamlString || typeof yamlString !== 'string') {
    return Object.create(null);
  }

  const lines = yamlString.split('\n');
  const result: any = Object.create(null);
  let currentTopLevelKey: string | null = null;
  let currentArrayKey: string | null = null;
  let lastPushedObj: any = null;

  let inBlockScalar = false;
  let blockScalarIndent = 0;
  let blockScalarKey: string | null = null;

  for (const line of lines) {
    if (line.trim() === '' && !inBlockScalar) continue;
    if (line.trim().startsWith('#') && !inBlockScalar) continue;
    
    const indent = line.search(/\S|$/);
    const trimmed = line.trim();

    if (inBlockScalar) {
      if (trimmed === '' || indent >= blockScalarIndent) {
        const cleanLine = trimmed === '' ? '' : line.slice(blockScalarIndent);
        if (lastPushedObj && blockScalarKey && blockScalarKey in lastPushedObj) {
          lastPushedObj[blockScalarKey] += (lastPushedObj[blockScalarKey] ? '\n' : '') + cleanLine;
        } else if (currentTopLevelKey && result[currentTopLevelKey]) {
          if (blockScalarKey && blockScalarKey in result[currentTopLevelKey]) {
            result[currentTopLevelKey][blockScalarKey] += (result[currentTopLevelKey][blockScalarKey] ? '\n' : '') + cleanLine;
          }
        } else {
          if (blockScalarKey && blockScalarKey in result) {
            result[blockScalarKey] += (result[blockScalarKey] ? '\n' : '') + cleanLine;
          }
        }
        continue;
      } else {
        inBlockScalar = false;
      }
    }

    if (trimmed && !trimmed.includes(':') && !trimmed.startsWith('-')) {
      continue;
    }

    const arrayMatch = line.match(/^(\s*)-\s+(.*)$/);
    if (arrayMatch) {
      const itemVal = arrayMatch[2].trim();
      if (currentTopLevelKey) {
        if (!Array.isArray(result[currentTopLevelKey])) {
          result[currentTopLevelKey] = [];
        }
        
        const objMatch = itemVal.match(/^([^:]+):\s*(.*)$/);
        if (objMatch) {
          lastPushedObj = Object.create(null);
          const key = objMatch[1].trim();
          const val = objMatch[2].trim() || '';
          if (val === '|') {
            lastPushedObj[key] = '';
            inBlockScalar = true;
            blockScalarIndent = indent + 2;
            blockScalarKey = key;
          } else {
            lastPushedObj[key] = parseValue(val);
          }
          result[currentTopLevelKey].push(lastPushedObj);
        } else {
          if (lastPushedObj && currentArrayKey && Array.isArray(lastPushedObj[currentArrayKey])) {
            lastPushedObj[currentArrayKey].push(parseValue(itemVal));
          } else if (currentTopLevelKey && currentArrayKey && Array.isArray(result[currentTopLevelKey][currentArrayKey])) {
            result[currentTopLevelKey][currentArrayKey].push(parseValue(itemVal));
          } else {
            result[currentTopLevelKey].push(parseValue(itemVal));
          }
        }
      }
      continue;
    }

    const match = trimmed.match(/^([^:]+):\s*(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      
      if (value === '|') {
        let target: any = null;
        if (indent > 0 && lastPushedObj) target = lastPushedObj;
        else if (indent > 0 && currentTopLevelKey) {
          if (!result[currentTopLevelKey]) result[currentTopLevelKey] = Object.create(null);
          target = result[currentTopLevelKey];
        }
        else target = result;

        target[key] = '';
        inBlockScalar = true;
        blockScalarIndent = indent + 2; 
        blockScalarKey = key;
        if (!lastPushedObj && indent === 0) currentTopLevelKey = key;
        continue;
      }

      if (indent > 0 && lastPushedObj) {
        if (!value) {
          lastPushedObj[key] = [];
          currentArrayKey = key;
        } else {
          lastPushedObj[key] = parseValue(value);
        }
        continue;
      }

      if (indent > 0 && currentTopLevelKey && !lastPushedObj) {
        if (!value) {
          result[currentTopLevelKey][key] = [];
          currentArrayKey = key;
        } else {
          result[currentTopLevelKey][key] = parseValue(value);
        }
        continue;
      }

      if (!value) {
        result[key] = Object.create(null);
        currentTopLevelKey = key;
        currentArrayKey = null;
        lastPushedObj = null; 
        continue;
      }
      
      result[key] = parseValue(value);
    }
  }
  return result;
}

export function stringifyYaml(obj: any, indent = 0): string {
  if (obj === null || obj === undefined) return '';
  const spaces = ' '.repeat(indent);
  let result = '';

  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (typeof item === 'object' && item !== null) {
        result += `${spaces}- `;
        const entries = Object.entries(item);
        if (entries.length > 0) {
          result += `${entries[0][0]}: ${entries[0][1]}\n`;
          for (let i = 1; i < entries.length; i++) {
            result += `${spaces}  ${entries[i][0]}: ${entries[i][1]}\n`;
          }
        }
      } else {
        result += `${spaces}- ${item}\n`;
      }
    }
    return result;
  }

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      result += `${spaces}${key}:\n`;
      result += stringifyYaml(value, indent + 2);
    } else if (typeof value === 'object' && value !== null) {
      result += `${spaces}${key}:\n`;
      result += stringifyYaml(value, indent + 2);
    } else {
      result += `${spaces}${key}: ${value}\n`;
    }
  }

  return result;
}

function parseValue(value: string): any {
  if (!value) return value;
  if (value.startsWith('"') && value.endsWith('"')) return value.slice(1, -1);
  if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1);
  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;
  if (!isNaN(Number(value)) && value !== '') return Number(value);
  if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
    const inner = value.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
  }
  return value;
}
