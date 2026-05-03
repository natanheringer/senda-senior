import { describe, expect, it } from "vitest";
import { cn } from "@/design";

describe("Design Import Test", () => {
  it("should import cn from @/design", () => {
    expect(typeof cn).toBe("function");
  });
});
