export function parseYaml(yamlString: string): any {
  if (!yamlString || typeof yamlString !== 'string') {
    return {};
  }

  const cleanYaml = yamlString.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = cleanYaml.split('\n');
  const result: any = {};
  
  let currentTopLevelKey: string | null = null;
  let currentArrayKey: string | null = null;
  let lastPushedObj: any = null;
  let lastKeyIndent = -1;
  let lastArrayIndent = -1;

  let inBlockScalar = false;
  let blockScalarIndent = 0;
  let blockScalarKey: string | null = null;

  for (const line of lines) {
    if (line.trim() === '' && !inBlockScalar) continue;
    if (line.trim().startsWith('#') && !inBlockScalar) continue;
    
    const indent = line.search(/\S|$/);
    const trimmed = line.trim();

    if (inBlockScalar && blockScalarKey) {
      if (trimmed === '') {
        const cleanLine = '';
        if (lastPushedObj && typeof lastPushedObj === 'object' && blockScalarKey in lastPushedObj) {
          lastPushedObj[blockScalarKey] += (lastPushedObj[blockScalarKey] ? '\n' : '') + cleanLine;
        } else if (currentTopLevelKey === blockScalarKey) {
          result[currentTopLevelKey] = (result[currentTopLevelKey] || '') + (result[currentTopLevelKey] ? '\n' : '') + cleanLine;
        } else if (currentTopLevelKey && typeof result[currentTopLevelKey] === 'object' && result[currentTopLevelKey] !== null && blockScalarKey in result[currentTopLevelKey]) {
          result[currentTopLevelKey][blockScalarKey] = (result[currentTopLevelKey][blockScalarKey] || '') + (result[currentTopLevelKey][blockScalarKey] ? '\n' : '') + cleanLine;
        } else if (blockScalarKey in result) {
          result[blockScalarKey] = (result[blockScalarKey] || '') + (result[blockScalarKey] ? '\n' : '') + cleanLine;
        }
        continue;
      }

      if (blockScalarIndent === 0) {
        blockScalarIndent = indent;
      }

      if (indent >= blockScalarIndent) {
        const cleanLine = line.slice(blockScalarIndent);
        if (lastPushedObj && typeof lastPushedObj === 'object' && blockScalarKey in lastPushedObj) {
          lastPushedObj[blockScalarKey] += (lastPushedObj[blockScalarKey] ? '\n' : '') + cleanLine;
        } else if (currentTopLevelKey === blockScalarKey) {
          result[currentTopLevelKey] = (result[currentTopLevelKey] || '') + (result[currentTopLevelKey] ? '\n' : '') + cleanLine;
        } else if (currentTopLevelKey && typeof result[currentTopLevelKey] === 'object' && result[currentTopLevelKey] !== null && blockScalarKey in result[currentTopLevelKey]) {
          result[currentTopLevelKey][blockScalarKey] = (result[currentTopLevelKey][blockScalarKey] || '') + (result[currentTopLevelKey][blockScalarKey] ? '\n' : '') + cleanLine;
        } else if (blockScalarKey in result) {
          result[blockScalarKey] = (result[blockScalarKey] || '') + (result[blockScalarKey] ? '\n' : '') + cleanLine;
        }
        continue;
      } else {
        inBlockScalar = false;
      }
    }

    if (trimmed && !trimmed.includes(':') && !trimmed.startsWith('-')) {
      continue;
    }

    // Array item detection - handle both "- item" and "- key: val"
    const arrayMatch = line.match(/^(\s*)-\s+(.*)$/);
    if (arrayMatch) {
      const arrayIndent = arrayMatch[1].length;
      const itemVal = arrayMatch[2].trim();
      
      if (currentTopLevelKey) {
        // If this hyphen is at a lower indent than the current array key, reset it
        if (lastArrayIndent !== -1 && arrayIndent < lastKeyIndent) {
            currentArrayKey = null;
            lastPushedObj = null;
        }

        // Find target array
        let targetArray: any[] | null = null;
        if (currentArrayKey && lastPushedObj && Array.isArray(lastPushedObj[currentArrayKey])) {
            targetArray = lastPushedObj[currentArrayKey];
        } else if (currentArrayKey && typeof result[currentTopLevelKey] === 'object' && result[currentTopLevelKey] !== null && Array.isArray(result[currentTopLevelKey][currentArrayKey])) {
            targetArray = result[currentTopLevelKey][currentArrayKey];
        } else {
            if (!Array.isArray(result[currentTopLevelKey])) {
                result[currentTopLevelKey] = [];
            }
            targetArray = result[currentTopLevelKey];
        }
        
        if (targetArray) {
            const objMatch = itemVal.match(/^([^:]+):\s*(.*)$/);
            if (objMatch) {
              lastPushedObj = {};
              currentArrayKey = null; // New object starts, reset sub-array key
              const key = objMatch[1].trim();
              const val = objMatch[2].trim() || '';
              if (val === '|') {
                lastPushedObj[key] = '';
                inBlockScalar = true;
                blockScalarIndent = 0; 
                blockScalarKey = key;
              } else {
                lastPushedObj[key] = parseValue(val);
              }
              targetArray.push(lastPushedObj);
              lastArrayIndent = arrayIndent;
              lastKeyIndent = arrayIndent + (line.indexOf(key) - arrayIndent);
            } else {
              targetArray.push(parseValue(itemVal));
              lastArrayIndent = arrayIndent;
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
          if (typeof result[currentTopLevelKey] !== 'object' || result[currentTopLevelKey] === null) result[currentTopLevelKey] = {};
          target = result[currentTopLevelKey];
        }
        else target = result;

        target[key] = '';
        inBlockScalar = true;
        blockScalarIndent = 0; // Will be set by next non-empty line
        blockScalarKey = key;
        if (!lastPushedObj && indent === 0) {
            currentTopLevelKey = key;
        }
        continue;
      }

      if (indent > 0 && lastPushedObj) {
        if (!value) {
          lastPushedObj[key] = [];
          currentArrayKey = key;
          lastKeyIndent = indent;
        } else {
          lastPushedObj[key] = parseValue(value);
          lastKeyIndent = indent;
        }
        continue;
      }

      if (indent > 0 && currentTopLevelKey) {
        if (typeof result[currentTopLevelKey] !== 'object' || result[currentTopLevelKey] === null) {
            result[currentTopLevelKey] = {};
        }
        if (!value) {
          result[currentTopLevelKey][key] = [];
          currentArrayKey = key;
          lastKeyIndent = indent;
        } else {
          result[currentTopLevelKey][key] = parseValue(value);
          lastKeyIndent = indent;
        }
        continue;
      }

      if (!value) {
        result[key] = {};
        currentTopLevelKey = key;
        currentArrayKey = null;
        lastPushedObj = null; 
        lastKeyIndent = 0;
        continue;
      }
      
      result[key] = parseValue(value);
      if (indent === 0) {
        currentTopLevelKey = key;
        lastPushedObj = null;
        currentArrayKey = null;
        lastKeyIndent = 0;
      }
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
