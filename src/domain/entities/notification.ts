export type NotificationChannel = "email" | "sms" | "push" | "in_app";

export type Notification = {
  id: string;
  recipientId: string;
  message: string;
  channel: NotificationChannel;
  createdAt: Date;
};

// Layer note: domain/entities holds pure business shapes only. No imports from
// services, adapters, controllers, components, lib, or Next.js — so the core
// stays reusable across clients without knowing how delivery happens.
