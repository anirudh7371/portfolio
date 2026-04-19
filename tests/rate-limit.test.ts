import { describe, expect, it, vi } from "vitest";
import { checkRateLimit } from "../lib/rate-limit";

describe("checkRateLimit", () => {
  it("allows requests under limit and blocks after limit", () => {
    const key = `test-${Date.now()}`;

    const first = checkRateLimit(key, 2, 1000);
    const second = checkRateLimit(key, 2, 1000);
    const third = checkRateLimit(key, 2, 1000);

    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
    expect(third.allowed).toBe(false);
    expect(third.retryAfterMs).toBeGreaterThan(0);
  });

  it("resets after window expires", () => {
    vi.useFakeTimers();
    const key = "reset-window";

    expect(checkRateLimit(key, 1, 500).allowed).toBe(true);
    expect(checkRateLimit(key, 1, 500).allowed).toBe(false);

    vi.advanceTimersByTime(501);

    expect(checkRateLimit(key, 1, 500).allowed).toBe(true);
    vi.useRealTimers();
  });
});
