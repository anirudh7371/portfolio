import { fail, ok } from "@/lib/api-response";
import { requireAdminOrResponse } from "@/lib/admin-api";
import { projectInputSchema } from "@/lib/validators";
import {
  deleteAdminProject,
  updateAdminProject,
} from "@/services/admin-content-service";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { session, response } = await requireAdminOrResponse();
  if (response || !session) {
    return response;
  }

  try {
    const { id } = await context.params;
    const body = await request.json();
    const parsed = projectInputSchema.partial().safeParse(body);

    if (!parsed.success) {
      return fail("Invalid payload", 400, parsed.error.flatten());
    }

    const project = await updateAdminProject(id, parsed.data, session.user.id);
    return ok(project);
  } catch {
    return fail("Failed to update project", 500);
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { response } = await requireAdminOrResponse();
  if (response) {
    return response;
  }

  try {
    const { id } = await context.params;
    await deleteAdminProject(id);
    return ok({ deleted: true });
  } catch {
    return fail("Failed to delete project", 500);
  }
}
