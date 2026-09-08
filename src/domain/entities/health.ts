/** Minimal domain marker so the harness can verify the MVC layout and Vitest. */
export const PROJECT_NAME = "dashboard";

export function getHealthStatus(): "ok" {
  return "ok";
}

// Layer note: domain/entities stays free of infrastructure. This smoke helper
// has no I/O so the harness can import domain without pulling adapters.
