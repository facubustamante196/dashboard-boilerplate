import type { Notification } from "@/domain/entities/notification";

/** In-memory / console “wire” for the fake provider — no real network. */
export type FakeNotifierPayload = {
  to: string;
  body: string;
  channel: string;
  id: string;
  at: string;
};

export class FakeNotifierClient {
  readonly sent: FakeNotifierPayload[] = [];

  async deliver(payload: FakeNotifierPayload): Promise<void> {
    this.sent.push(payload);
    console.log("[FakeNotifier]", payload);
  }
}

export function toFakePayload(notification: Notification): FakeNotifierPayload {
  return {
    to: notification.recipientId,
    body: notification.message,
    channel: notification.channel,
    id: notification.id,
    at: notification.createdAt.toISOString(),
  };
}

// Layer note: client.ts is the raw “transport” for this integration only. It
// does not import other integrations or services — just shape + deliver so the
// adapter index can implement the port without mixing concerns.
