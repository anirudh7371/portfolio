import { fail, ok } from "@/lib/api-response";
import { getPublicProjects } from "@/services/public-content-service";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured") === "true";
    const tech = searchParams.get("tech") ?? undefined;
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Number(limitParam) : undefined;

    const projects = await getPublicProjects({
      featured,
      tech,
      limit: Number.isFinite(limit) ? limit : undefined,
    });

    return ok(projects);
  } catch {
    return fail("Failed to load projects", 500);
  }
}
