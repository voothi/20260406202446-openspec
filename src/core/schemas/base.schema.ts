/**
 * Zero-dependency base schemas.
 */
export const ScenarioSchema = {
  rawText: 'string',
};

export const RequirementSchema = {
  text: 'string',
  scenarios: 'array',
};

export interface Scenario {
  rawText: string;
}

export interface Requirement {
  text: string;
  scenarios: Scenario[];
}