import { fail, ok } from "@/lib/api-response";
import { requireAdminOrResponse } from "@/lib/admin-api";
import { projectInputSchema } from "@/lib/validators";
import {
  createAdminProject,
  listAdminProjects,
} from "@/services/admin-content-service";

export async function GET() {
  const { response } = await requireAdminOrResponse();
  if (response) {
    return response;
  }

  try {
    const projects = await listAdminProjects();
    return ok(projects);
  } catch {
    return fail("Failed to load projects", 500);
  }
}

export async function POST(request: Request) {
  const { session, response } = await requireAdminOrResponse();
  if (response || !session) {
    return response;
  }

  try {
    const body = await request.json();
    const parsed = projectInputSchema.safeParse(body);

    if (!parsed.success) {
      return fail("Invalid payload", 400, parsed.error.flatten());
    }

    const project = await createAdminProject(parsed.data, session.user.id);
    return ok(project, { status: 201 });
  } catch {
    return fail("Failed to create project", 500);
  }
}
