import { z } from "zod";

const fileIdSchema = z.object({
  fileId: z.string().uuid(),
});

describe("UUID Validation Test", () => {
  it("should validate standard UUID", () => {
    const result = fileIdSchema.safeParse({
      fileId: "123e4567-e89b-12d3-a456-426614174000",
    });
    console.log("Result:", result);
    expect(result.success).toBe(true);
  });

  it("should validate another UUID", () => {
    const result = fileIdSchema.safeParse({
      fileId: "987f6543-b21a-43d2-b654-321fe8765432",
    });
    console.log("Result:", result);
    expect(result.success).toBe(true);
  });

  it("should validate UUID with all same characters", () => {
    const result = fileIdSchema.safeParse({
      fileId: "aaaaaaaa-bbbb-cccc-dddd-eeeeffff0000",
    });
    console.log("Result:", result);
    expect(result.success).toBe(true);
  });

  it("should reject invalid UUID", () => {
    const result = fileIdSchema.safeParse({ fileId: "not-a-uuid" });
    console.log("Result:", result);
    expect(result.success).toBe(false);
  });
});
