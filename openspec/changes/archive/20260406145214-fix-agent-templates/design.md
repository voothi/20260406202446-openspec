# Design: Fix OpenSpec Templates for Namespaced ZID

## Overview
We will identify the specific strings in the `dist/` template files and replace them with the namespaced ZID logic, following the pattern established in commit `985ee9f4b446547fcad8975e516530a43c635f12`.

## Proposed Changes

### Files to Modify

#### 1. `dist/core/templates/workflows/propose.js`
Update both `getOpsxProposeSkillTemplate` and `getOpsxProposeCommandTemplate`.
- **Target**: `From their description, derive a kebab-case name (e.g., "add user authentication" → \`add-user-auth\`).`
- **Replacement**: `From their description, derive a namespaced name: <ZID>-<kebab-case-name>, where ZID is the current timestamp in YYYYMMDDHHMMSS format (e.g., "add user authentication" → \`20240322174550-add-user-auth\`).`

#### 2. `dist/core/templates/workflows/new-change.js`
Update both `getNewChangeSkillTemplate` and `getOpsxNewCommandTemplate`.
- **Target**: Same as above.
- **Replacement**: Same as above.

#### 3. `dist/core/templates/workflows/ff-change.js`
Update both `getFfChangeSkillTemplate` and `getOpsxFfCommandTemplate`.
- **Target**: Same as above.
- **Replacement**: Same as above.

## Verification
Verification will involve reading the files back to ensure the replacement was successful. Since we are modifying `dist/` directly, the changes are immediate.

## Potential Risks
- Modifying `dist/` files directly is usually not recommended in development, but since the `src/` is not available, this is the only way to apply the fixes to the installed package.
- If the project is rebuilt using `npm run build` later from the true source, these changes would be overwritten. However, in this environment, this seems to be the intended method for manual fixes.
