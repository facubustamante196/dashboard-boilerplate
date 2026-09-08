/**
 * Fake provider has no credentials. Real integrations (OAuth, API keys, refresh)
 * would live here without leaking into domain or services.
 */
export type FakeNotifierAuth = {
  mode: "none";
};

export function createFakeNotifierAuth(): FakeNotifierAuth {
  return { mode: "none" };
}

// Layer note: auth stays inside this integration folder. Domain never sees
// tokens; swapping to a real provider only changes this file + client, not use cases.
