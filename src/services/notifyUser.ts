import type { Notification } from "@/domain/entities/notification";
import type { Notifier } from "@/domain/ports/notifier";

export async function notifyUserUseCase(
  notification: Notification,
  notifier: Notifier,
): Promise<void> {
  await notifier.send(notification);
}

// Layer note: services depend only on domain (entities + ports). The Notifier
// is injected — this module never imports adapters/integrations/*, so tests can
// pass a mock and production can pass FakeNotifier or a real provider later.
