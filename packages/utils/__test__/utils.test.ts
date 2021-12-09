import { EzError } from "../src";

describe("EzError", () => {
  describe("Full Error", () => {
    let err: EzError;

    beforeAll(() => {
      err = new EzError(
        "Error Summary",
        "Error Description",
        "Some Code",
        "Docs Link",
      );
    });
    it("Should throw a well formatted error", async () => {
      expect(err.toString()).toContain("Error Summary");
      expect(err.toString()).toContain("Error Description");
      expect(err.toString()).toContain("Some Code");
      expect(err.toString()).toContain("Docs Link");
    });

    it("Should contain a summary property", async () => {
      expect(err.summary).not.toBe(undefined);
      expect(err.summary).toBe("Error Summary");
    });

    it("Should contain a description property", async () => {
      expect(err.description).not.toBe(undefined);
      expect(err.description).toBe("Error Description");
    });

    it("Should contain a code property", async () => {
      expect(err.code).not.toBe(undefined);
      expect(err.code).toBe("Some Code");
    });

    it("Should contain a link property", async () => {
      expect(err.link).not.toBe(undefined);
      expect(err.link).toBe("Docs Link");
    });
  });

  describe("Partial Error", () => {
    let err: EzError;

    beforeAll(() => {
      err = new EzError("Error Summary", "Error Description");
    });
    it("Should work fine without the code", async () => {
      expect(err.code).toBe(undefined);
    });

    it("Should work fine without the link", async () => {
      expect(err.link).toBe(undefined);
    });
  });
});
