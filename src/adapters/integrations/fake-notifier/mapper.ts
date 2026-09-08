import type { Notification } from "@/domain/entities/notification";
import {
  type FakeNotifierPayload,
  toFakePayload,
} from "@/adapters/integrations/fake-notifier/client";

export function mapNotificationToFake(
  notification: Notification,
): FakeNotifierPayload {
  return toFakePayload(notification);
}

// Layer note: mapper translates domain <-> provider format. Services never see
// FakeNotifierPayload; only this integration knows the wire shape.
