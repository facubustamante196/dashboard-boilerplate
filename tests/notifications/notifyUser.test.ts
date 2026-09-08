import { describe, expect, it, vi } from "vitest";
import type { Notification } from "@/domain/entities/notification";
import type { Notifier } from "@/domain/ports/notifier";
import { notifyUserUseCase } from "@/services/notifyUser";

describe("notifyUserUseCase", () => {
  // T1: use case delegates to the injected Notifier port (no real integration)
  it("T1: sends via injected Notifier mock", async () => {
    const notification: Notification = {
      id: "n-1",
      recipientId: "user-42",
      message: "System event occurred",
      channel: "in_app",
      createdAt: new Date("2026-09-08T12:00:00.000Z"),
    };

    const send = vi.fn(async (_n: Notification) => undefined);
    const notifier: Notifier = { send };

    await notifyUserUseCase(notification, notifier);

    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith(notification);
  });
});

// Layer note: this test proves services are portable — only a Notifier mock is
// required. No FakeNotifier, Prisma, or HTTP. Swap providers without rewriting
// the use case or this test.
