import { FakeNotifier } from "@/adapters/integrations/fake-notifier";
import type { Notifier } from "@/domain/ports/notifier";

let notifierSingleton: Notifier | null = null;

/** Composition root: the only place that picks a concrete Notifier. */
export function getNotifier(): Notifier {
  if (!notifierSingleton) {
    notifierSingleton = new FakeNotifier();
  }
  return notifierSingleton;
}

/** Test helper — reset wiring between cases if needed. */
export function resetComposition(): void {
  notifierSingleton = null;
}

// Layer note: composition binds ports to adapters. Services never call this;
// controllers (or future DI) do. Swap FakeNotifier for a real provider here
// without touching domain or use cases.
