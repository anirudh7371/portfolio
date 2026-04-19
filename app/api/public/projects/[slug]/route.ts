import { fail, ok } from "@/lib/api-response";
import { getPublicProjectBySlug } from "@/services/public-content-service";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await context.params;
    const project = await getPublicProjectBySlug(slug);

    if (!project) {
      return fail("Project not found", 404);
    }

    return ok(project);
  } catch {
    return fail("Failed to load project", 500);
  }
}
