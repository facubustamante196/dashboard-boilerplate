import type { Notification } from "@/domain/entities/notification";

export interface Notifier {
  send(notification: Notification): Promise<void>;
}

// Layer note: domain/ports declares contracts only. This file never imports an
// adapter; concrete senders (email, SMS, fake) live outside and implement this
// interface so services stay decoupled from delivery technology.
