/**
 * Zero-dependency base schemas.
 */
import { VALIDATION_MESSAGES } from '../validation/constants.js';

export const ScenarioSchema = (val: any) => {
  if (typeof val?.rawText !== 'string' || val.rawText.trim().length === 0) {
    return { success: false, errors: [VALIDATION_MESSAGES.SCENARIO_EMPTY] };
  }
  return { success: true, errors: [] };
};

import { validate } from '../validate.js';

export const RequirementSchema = (val: any) => {
  const basic = validate(val, {
    text: 'string',
    scenarios: 'array',
  });
  if (!basic.success) return basic;

  const errors: string[] = [];
  if (!/\b(SHALL|MUST)\b/.test(val.text)) {
    errors.push(VALIDATION_MESSAGES.REQUIREMENT_NO_SHALL);
  }
  if (val.scenarios.length === 0) {
    errors.push(VALIDATION_MESSAGES.REQUIREMENT_NO_SCENARIOS);
  }

  return { success: errors.length === 0, errors };
};

export interface Scenario {
  rawText: string;
}

export interface Requirement {
  text: string;
  scenarios: Scenario[];
}