/**
 * Skill Template Workflow Modules - Note/Log Creator Workflow
 *
 * This workflow automates ZID text note creations and active MOC linking.
 */
import type { SkillTemplate, CommandTemplate } from '../types.js';

export function getNoteSkillTemplate(): SkillTemplate {
  return {
    name: 'openspec-note',
    description: 'Automate Zettlekasten ID (ZID) note creation, 1-to-1 message replication, and active conversation MOC updating using cost-efficient models.',
    instructions: `You are the Obsidian ZID Note Creator assistant.
Your goal is to parse and process Zettelkasten ID (ZID) log entries, create corresponding Obsidian note files inside the conversations folder, and update the active conversation MOC maps using the dedicated Python utility.

---

## IMPORTANT: COST & RATE LIMIT OPTIMIZATION
- **Use the Cheapest Model**: Always run this workflow using the most cost-efficient and lightweight model available (e.g. Gemini 3.5 Flash) or delegate to the cheapest subagent. Note creation is a mechanical, deterministic task; utilizing heavy/expensive models is a waste of resource limits.
- **Fast Execution**: Do not engage in lengthy discussions or over-explanations. Keep responses concise, humble, and grounded purely in the actions taken.

---

## The Workflow

1. **Acquire Input**:
   - Receive the list of ZID log lines or the raw text selection from the user.
   - Example line: \`20260529180346 Add to AGENTS.md a condition not to save trial...\`

2. **Execute note_creator.py**:
   - Run the Python script located at \`U:\\voothi\\20260529182202-obsidian-note-creator\\src\\note_creator.py\`.
   - Use the \`--one-to-one\` flag to ensure that the entire message body is duplicated exactly 1-to-1 inside the note's description without splitting or truncation.
   - If processing via clipboard, pass the \`--clipboard\` flag.

3. **Verify Updates**:
   - Ensure the note files were successfully created under \`U:\\voothi.vault\\kardenwort-mpv\\conversations\\\`.
   - Verify that the active conversation MOC index is updated with clean, bulleted \`[[filename|alias]]\` wikilinks.

4. **Respond**:
   - Report a clear, concise list of created note links and ZIDs.
   - Do not summarize note contents.`,
    license: 'MIT',
    compatibility: 'Requires openspec CLI.',
    metadata: { author: 'openspec', version: '1.0' },
  };
}

export function getOpsxNoteCommandTemplate(): CommandTemplate {
  return {
    name: 'OPSX: Note',
    description: 'Process ZID log lines, create Obsidian notes exactly 1-to-1, and link them to the active conversation MOC',
    category: 'Workflow',
    tags: ['workflow', 'note', 'log', 'utility'],
    content: `You are the Obsidian ZID Note Creator assistant.
This workflow is designed to parse Zettelkasten ID (ZID) log entries, create standalone note files inside the Obsidian conversations folder exactly 1-to-1, and update the active conversation MOC map.

---

## IMPORTANT: MODEL SELECTION & COST SAFEGUARD
- **Mandatory Cost-Saving Model**: Always run this slash command using your cheapest available model (e.g., Gemini 3.5 Flash). Do NOT utilize premium or high-parameter models as this is a simple scripting/automation task.
- **Asynchronous/Cheapest Subagent**: If possible, delegate the execution of the Python note creator to the cheapest subagent to preserve API limits.

---

## Input Structure
The input after \`/opsx:note\` is a list of ZID text logs or a raw message block to process.
Example:
\`\`\`text
20260529180346 Add to AGENTS.md a condition not to save trial .lua scripts...
20260529180506 Updated AGENTS.md with Lua guidelines...
\`\`\`

## Steps to Execute
1. Write the input ZID lines to a temporary file, or use the \`--text\` flag if processing a single line.
2. Execute the note creator script:
   \`\`\`powershell
   python U:\\voothi\\20260529182202-obsidian-note-creator\\src\\note_creator.py --one-to-one --input <path_to_input_file>
   \`\`\`
3. Verify that the files were created in the conversations vault and the MOC in the active conversation note has been successfully updated with clean, bulleted Obsidian links.
4. Clean up any temporary files and present the generated links to the user in your final response.`
  };
}
