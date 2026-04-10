import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { randomUUID } from 'node:crypto';

import { isTelemetryEnabled, maybeShowTelemetryNotice, shutdown, trackCommand } from '../../src/telemetry/index.js';

describe('telemetry/index', () => {
  let tempDir: string;
  let originalEnv: NodeJS.ProcessEnv;
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    tempDir = path.join(os.tmpdir(), `openspec-telemetry-test-${randomUUID()}`);
    fs.mkdirSync(tempDir, { recursive: true });
    originalEnv = { ...process.env };
    process.env.HOME = tempDir;
    vi.clearAllMocks();
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = originalEnv;
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {
      // Ignore
    }
    vi.restoreAllMocks();
  });

  describe('isTelemetryEnabled', () => {
    it('should always return false (permanently disabled)', () => {
      process.env.OPENSPEC_TELEMETRY = '1';
      expect(isTelemetryEnabled()).toBe(false);
      
      delete process.env.OPENSPEC_TELEMETRY;
      expect(isTelemetryEnabled()).toBe(false);
    });
  });

  describe('trackCommand', () => {
    it('should be a no-op', async () => {
      await expect(trackCommand('test', '1.0.0')).resolves.not.toThrow();
    });
  });

  describe('maybeShowTelemetryNotice', () => {
    it('should be a no-op', async () => {
      await expect(maybeShowTelemetryNotice()).resolves.not.toThrow();
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });
  });

  describe('shutdown', () => {
    it('should be a no-op', async () => {
      await expect(shutdown()).resolves.not.toThrow();
    });
  });
});
