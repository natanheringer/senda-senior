
import {
  prepareUploadSchema,
  updateMetadataSchema,
  fileIdSchema,
} from "./validation";

describe("Vault Validation Schemas", () => {
  describe("prepareUploadSchema", () => {
    it("should validate correct input", () => {
      const result = prepareUploadSchema.safeParse({
        name: "test-file.pdf",
        size: 1024,
        mime: "application/pdf",
        sha256:
          "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", // SHA-256 of empty string
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("test-file.pdf");
        expect(result.data.size).toBe(1024);
        expect(result.data.mime).toBe("application/pdf");
      }
    });

    it("should reject invalid SHA-256", () => {
      const result = prepareUploadSchema.safeParse({
        name: "test-file.pdf",
        size: 1024,
        mime: "application/pdf",
        sha256: "invalid-sha256",
      });

      expect(result.success).toBe(false);
    });

    it("should reject file that is too large", () => {
      const result = prepareUploadSchema.safeParse({
        name: "test-file.pdf",
        size: 60 * 1024 * 1024, // 60 MB > 50 MB limit
        mime: "application/pdf",
        sha256:
          "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      });

      expect(result.success).toBe(false);
    });
  });

  describe("updateMetadataSchema", () => {
    it("should validate correct input", () => {
      const result = updateMetadataSchema.safeParse({
        fileId: "123e4567-e89b-12d3-a456-426614174000",
        patch: {
          displayName: "New Display Name",
          description: "New Description",
          categorySlug: "juridico",
          tagSlugs: ["tag1", "tag2"],
          favorite: true,
        },
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.fileId).toBe("123e4567-e89b-12d3-a456-426614174000");
        expect(result.data.patch.displayName).toBe("New Display Name");
        expect(result.data.patch.description).toBe("New Description");
        expect(result.data.patch.categorySlug).toBe("juridico");
        expect(result.data.patch.tagSlugs).toEqual(["tag1", "tag2"]);
        expect(result.data.patch.favorite).toBe(true);
      }
    });

    it("should accept partial updates", () => {
      const result = updateMetadataSchema.safeParse({
        fileId: "123e4567-e89b-12d3-a456-426614174000",
        patch: {
          categorySlug: "trabalho",
        },
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.fileId).toBe("123e4567-e89b-12d3-a456-426614174000");
        expect(result.data.patch.categorySlug).toBe("trabalho");
        expect(result.data.patch.displayName).toBeUndefined();
        expect(result.data.patch.description).toBeUndefined();
        expect(result.data.patch.tagSlugs).toBeUndefined();
        expect(result.data.patch.favorite).toBeUndefined();
      }
    });

    it("should reject invalid UUID", () => {
      const result = updateMetadataSchema.safeParse({
        fileId: "invalid-uuid",
        patch: {},
      });

      expect(result.success).toBe(false);
    });
  });

  describe("fileIdSchema", () => {
    it("should validate valid UUID file IDs", () => {
      const validIds = [
        "123e4567-e89b-12d3-a456-426614174000",
        "987f6543-b21a-43d2-b654-321fe8765432",
        "aaaaaaaa-bbbb-cccc-dddd-eeeeffff0000",
      ];

      for (const id of validIds) {
        const result = fileIdSchema.safeParse({ fileId: id });
        expect(result.success).toBe(true, `Failed for ID: ${id}`);
        if (result.success) {
          expect(result.data.fileId).toBe(id);
        }
      }
    });

    it("should reject invalid file IDs", () => {
      const invalidIds = [
        "",
        " ",
        "not-a-uuid",
        "123e4567-e89b-12d3-a456-42661417400", // too short
        "123e4567-e89b-12d3-a456-4266141740000", // too long
      ];

      for (const id of invalidIds) {
        const result = fileIdSchema.safeParse({ fileId: id });
        expect(result.success).toBe(false, `Should have failed for ID: ${id}`);
      }
    });
  });
});
