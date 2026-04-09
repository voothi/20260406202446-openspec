/**
 * Zero-dependency telemetry stub.
 * All analytics have been disabled for privacy and dependency reduction.
 */

export function isTelemetryEnabled(): boolean {
  return false;
}

export async function getOrCreateAnonymousId(): Promise<string> {
  return 'disabled';
}

export async function trackCommand(_commandName: string, _version: string): Promise<void> {
  // Telemetry disabled
}

export async function maybeShowTelemetryNotice(): Promise<void> {
  // Telemetry disabled
}

export async function shutdown(): Promise<void> {
  // Telemetry disabled
}
