import type { Notification } from "@/domain/entities/notification";
import type { Notifier } from "@/domain/ports/notifier";
import { createFakeNotifierAuth } from "@/adapters/integrations/fake-notifier/auth";
import {
  FakeNotifierClient,
} from "@/adapters/integrations/fake-notifier/client";
import { mapNotificationToFake } from "@/adapters/integrations/fake-notifier/mapper";

export class FakeNotifier implements Notifier {
  readonly client: FakeNotifierClient;
  readonly auth = createFakeNotifierAuth();

  constructor(client: FakeNotifierClient = new FakeNotifierClient()) {
    this.client = client;
  }

  async send(notification: Notification): Promise<void> {
    const payload = mapNotificationToFake(notification);
    await this.client.deliver(payload);
  }
}

export { FakeNotifierClient };

// Layer note: this is the adapter that implements domain/ports/Notifier.
// Services import the port type only; they never import FakeNotifier — wiring
// happens in composition/controllers so providers can be swapped per client.
