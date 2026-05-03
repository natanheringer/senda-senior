import { describe, expect, it } from "vitest";
import { cn } from "@/design/cn";

describe("Alias Mapping Test", () => {
  it("should resolve @/design/cn correctly", () => {
    expect(typeof cn).toBe("function");
  });
});
