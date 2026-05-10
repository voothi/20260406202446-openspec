import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';

import {
  type SkillTemplate,
  getApplyChangeSkillTemplate,
  getArchiveChangeSkillTemplate,
  getBulkArchiveChangeSkillTemplate,
  getContinueChangeSkillTemplate,
  getExploreSkillTemplate,
  getFeedbackSkillTemplate,
  getFfChangeSkillTemplate,
  getNewChangeSkillTemplate,
  getOnboardSkillTemplate,
  getOpsxApplyCommandTemplate,
  getOpsxArchiveCommandTemplate,
  getOpsxBulkArchiveCommandTemplate,
  getOpsxContinueCommandTemplate,
  getOpsxExploreCommandTemplate,
  getOpsxFfCommandTemplate,
  getOpsxNewCommandTemplate,
  getOpsxOnboardCommandTemplate,
  getOpsxSyncCommandTemplate,
  getOpsxProposeCommandTemplate,
  getOpsxProposeSkillTemplate,
  getOpsxVerifyCommandTemplate,
  getSyncSpecsSkillTemplate,
  getVerifyChangeSkillTemplate,
} from '../../../src/core/templates/skill-templates.js';
import { generateSkillContent } from '../../../src/core/shared/skill-generation.js';

const EXPECTED_FUNCTION_HASHES: Record<string, string> = {
  getExploreSkillTemplate: '55a2a1afcba0af88c638e77e4e3870f65ed82c030b4a2056d39812ae13a616be',
  getNewChangeSkillTemplate: 'c56925b8986e3185645cc4770d8b11235fb8dfc9d29bf4cbd8dd0fcfb27de533',
  getContinueChangeSkillTemplate: 'f2e413f0333dfd6641cc2bd1a189273fdea5c399eecdde98ef528b5216f097b3',
  getApplyChangeSkillTemplate: '26e52e67693e93fbcdd40dcd3e20949c07ce019183d55a8149d0260c791cd7f4',
  getFfChangeSkillTemplate: 'c3f788e2354755d3fbaa28469a3e6db6cf17b50b466b8ca9fdeef30c65989753',
  getSyncSpecsSkillTemplate: 'bded184e4c345619148de2c0ad80a5b527d4ffe45c87cc785889b9329e0f465b',
  getOnboardSkillTemplate: '771ff6c0d57ec6051c5bba809f09c2dc9faa8ce26454f8d23c9a7c48e593be4b',
  getOpsxExploreCommandTemplate: '91353d9e8633a3a9ce7339e796f1283478fca279153f3807c92f4f8ece246b19',
  getOpsxNewCommandTemplate: '2c845ecf0568f3582c10faaff689937c60aa7144c3470d2e31d3b2532e79dc05',
  getOpsxContinueCommandTemplate: '8bbaedcc95287f9e822572608137df4f49ad54cedfb08d3342d0d1c4e9716caa',
  getOpsxApplyCommandTemplate: 'a9d631a07fcd832b67d263ff3800b98604ab8d378baf1b0d545907ef3affa3b5',
  getOpsxFfCommandTemplate: 'cb68a562079c7a351c8ffd11537c2b039faaa2850da82c427ca49ce45da86ae7',
  getArchiveChangeSkillTemplate: '2954a5a7c59ed889327da58e9a03ebe379aca7a0adb559c502ea44ab7b1ad7b4',
  getBulkArchiveChangeSkillTemplate: '3f039d8355268760d10bab8716cb68d1f8f295d719bd094a86ad532ae3b3b0a6',
  getOpsxSyncCommandTemplate: '378d035fe7cc30be3e027b66dcc4b8afc78ef1c8369c39479c9b05a582fb5ccf',
  getVerifyChangeSkillTemplate: '63a213ba3b42af54a1cd56f5072234a03b265c3fe4a1da12cd6fbbef5ee46c4b',
  getOpsxArchiveCommandTemplate: 'e3a8a4e28b89802a5460c0d2bcaafe6b32c14631ec08a15b54538535ba702f94',
  getOpsxOnboardCommandTemplate: 'e1f52383b6077ddaf7529221b3c263ccf5cdd8e84a54078b2b72705fc162ea17',
  getOpsxBulkArchiveCommandTemplate: 'e1a8c4a9206eafc241d3a0be1f54e03fffd06390462fc4c2b13c803b9dcd3de7',
  getOpsxVerifyCommandTemplate: '9b4d3ca422553b7534764eb3a009da87a051612c5238e9baab294c7b1233e9a2',
  getOpsxProposeSkillTemplate: 'ef77cc2533ab28d40b87b85091aef6f9933f92538c4498f392b381c167c4a18f',
  getOpsxProposeCommandTemplate: 'b0342d989d3949d7f00ae2bc56c91caa5a4a9a1bcab1403ee849858a5900aa28',
  getFeedbackSkillTemplate: 'd7d83c5f7fc2b92fe8f4588a5bf2d9cb315e4c73ec19bcd5ef28270906319a0d',
};

const EXPECTED_GENERATED_SKILL_CONTENT_HASHES: Record<string, string> = {
  'openspec-explore': '90463d00761417dfbca5cb09361adcf8bbdbbb24000b86dd03647869a4104479',
  'openspec-new-change': '1ddfdf051deee7fb159dfc4cdde9771dfd2c1753c9d3cfdd4b3f9cadcb35beb0',
  'openspec-continue-change': '463cf0b980ec9c3c24774414ef2a3e48e9faa8577bc8748990f45ab3d5efe960',
  'openspec-apply-change': 'a0084442b59be9d7e22a0382a279d470501e1ecf74bdd5347e169951c9be191c',
  'openspec-ff-change': '18d4f9adc4bca99bdcd3431c86db8b9c2da173f1e19988948b96d53fbf091cba',
  'openspec-sync-specs': 'b8859cf454379a19ca35dbf59eedca67306607f44a355327f9dc851114e50bde',
  'openspec-archive-change': 'e2684e70ef0de4cbe9b2fab29f8777b864626f0e62f1da5472a8422a8085b77a',
  'openspec-bulk-archive-change': '08fac1fb701e98e332321ae73d21c78d2faca5069faf625b82fc265d6d094f3f',
  'openspec-verify-change': '30d07c6f7051965f624f5964db51844ec17c7dfd05f0da95281fe0ca73616326',
  'openspec-onboard': '06c456a79a4ced9f0136657e68b698dccb36e2fe630f05d61e5095652740e4df',
  'openspec-propose': '83572d0f4dcaf57a024f8400134acafa780f94ea929bf75a1bfcf67d550992ac',
};

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`;
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => `${JSON.stringify(key)}:${stableStringify(item)}`);

    return `{${entries.join(',')}}`;
  }

  return JSON.stringify(value);
}

function hash(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

describe('skill templates split parity', () => {
  it('preserves all template function payloads exactly', () => {
    const functionFactories: Record<string, () => unknown> = {
      getExploreSkillTemplate,
      getNewChangeSkillTemplate,
      getContinueChangeSkillTemplate,
      getApplyChangeSkillTemplate,
      getFfChangeSkillTemplate,
      getSyncSpecsSkillTemplate,
      getOnboardSkillTemplate,
      getOpsxExploreCommandTemplate,
      getOpsxNewCommandTemplate,
      getOpsxContinueCommandTemplate,
      getOpsxApplyCommandTemplate,
      getOpsxFfCommandTemplate,
      getArchiveChangeSkillTemplate,
      getBulkArchiveChangeSkillTemplate,
      getOpsxSyncCommandTemplate,
      getVerifyChangeSkillTemplate,
      getOpsxArchiveCommandTemplate,
      getOpsxOnboardCommandTemplate,
      getOpsxBulkArchiveCommandTemplate,
      getOpsxVerifyCommandTemplate,
      getOpsxProposeSkillTemplate,
      getOpsxProposeCommandTemplate,
      getFeedbackSkillTemplate,
    };

    const actualHashes = Object.fromEntries(
      Object.entries(functionFactories).map(([name, fn]) => [name, hash(stableStringify(fn()))])
    );

    expect(actualHashes).toEqual(EXPECTED_FUNCTION_HASHES);
  });

  it('preserves generated skill file content exactly', () => {
    // Intentionally excludes getFeedbackSkillTemplate: skillFactories only models templates
    // deployed via generateSkillContent, while feedback is covered in function payload parity.
    const skillFactories: Array<[string, () => SkillTemplate]> = [
      ['openspec-explore', getExploreSkillTemplate],
      ['openspec-new-change', getNewChangeSkillTemplate],
      ['openspec-continue-change', getContinueChangeSkillTemplate],
      ['openspec-apply-change', getApplyChangeSkillTemplate],
      ['openspec-ff-change', getFfChangeSkillTemplate],
      ['openspec-sync-specs', getSyncSpecsSkillTemplate],
      ['openspec-archive-change', getArchiveChangeSkillTemplate],
      ['openspec-bulk-archive-change', getBulkArchiveChangeSkillTemplate],
      ['openspec-verify-change', getVerifyChangeSkillTemplate],
      ['openspec-onboard', getOnboardSkillTemplate],
      ['openspec-propose', getOpsxProposeSkillTemplate],
    ];

    const actualHashes = Object.fromEntries(
      skillFactories.map(([dirName, createTemplate]) => [
        dirName,
        hash(generateSkillContent(createTemplate(), 'PARITY-BASELINE')),
      ])
    );

    expect(actualHashes).toEqual(EXPECTED_GENERATED_SKILL_CONTENT_HASHES);
  });
});
