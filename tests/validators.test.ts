import { describe, expect, it } from "vitest";
import { contactInputSchema, projectInputSchema } from "../lib/validators";

describe("validators", () => {
  it("accepts valid contact input and honeypot defaults", () => {
    const result = contactInputSchema.safeParse({
      name: "Test User",
      email: "test@example.com",
      subject: "Collaboration",
      message: "Would love to discuss an AI product engagement.",
      website: "",
      formStartedAt: Date.now() - 10_000,
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid project slug", () => {
    const result = projectInputSchema.safeParse({
      title: "My Project",
      slug: "My Invalid Slug",
      summary: "Summary",
      description: "Description",
      githubUrl: "https://github.com/example/repo",
      liveUrl: null,
      thumbnailUrl: null,
      featured: false,
      status: "DRAFT",
      displayOrder: 0,
      skillIds: [],
    });

    expect(result.success).toBe(false);
  });
});
