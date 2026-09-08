import { getNotifier } from "@/composition";
import type {
  Notification,
  NotificationChannel,
} from "@/domain/entities/notification";
import { notifyUserUseCase } from "@/services/notifyUser";

export type NotifyUserInput = {
  id: string;
  recipientId: string;
  message: string;
  channel: NotificationChannel;
  createdAt?: string | Date;
};

export type NotifyUserResult = {
  ok: true;
};

function toNotification(input: NotifyUserInput): Notification {
  const createdAt =
    input.createdAt instanceof Date
      ? input.createdAt
      : input.createdAt
        ? new Date(input.createdAt)
        : new Date();

  return {
    id: input.id,
    recipientId: input.recipientId,
    message: input.message,
    channel: input.channel,
    createdAt,
  };
}

/**
 * Thin controller: shape input → call use case with injected port → return output.
 * Suitable for Server Actions / route handlers later.
 */
export async function notifyUserController(
  input: NotifyUserInput,
): Promise<NotifyUserResult> {
  if (!input.id || !input.recipientId || !input.message || !input.channel) {
    throw new Error("Invalid notifyUser input: missing required fields");
  }

  const notification = toNotification(input);
  await notifyUserUseCase(notification, getNotifier());
  return { ok: true };
}

// Layer note: controllers may know composition + services. They do not own
// business rules (beyond input shape checks) and do not call adapter APIs
// directly — only the port resolved at the composition root.
