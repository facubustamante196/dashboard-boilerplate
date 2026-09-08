import { describe, expect, it } from "vitest";
import { PROJECT_NAME, getHealthStatus } from "@/domain/entities/health";

describe("harness smoke", () => {
  // T1: domain layer is reachable via @ alias and reports healthy
  it("T1: reports project health", () => {
    expect(PROJECT_NAME).toBe("dashboard");
    expect(getHealthStatus()).toBe("ok");
  });
});
