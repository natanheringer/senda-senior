import { z } from "zod";

const fileIdSchema = z.object({
  fileId: z.string().uuid(),
});

describe("UUID Validation Debug", () => {
  const testIds = [
    "123e4567-e89b-12d3-a456-426614174000",
    "987f6543-b21a-43d2-b654-321fe8765432",
    "aaaaaaaa-bbbb-cccc-dddd-eeeeffff0000",
  ];

  testIds.forEach((id) => {
    test(`should validate UUID: ${id}`, () => {
      const result = fileIdSchema.safeParse({ fileId: id });
      console.log(`Testing ${id}:`, result);
      if (!result.success) {
        console.log("Errors:", result.error.errors);
      }
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.fileId).toBe(id);
      }
    });
  });
});
