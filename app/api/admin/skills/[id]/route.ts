import { fail, ok } from "@/lib/api-response";
import { requireAdminOrResponse } from "@/lib/admin-api";
import { skillInputSchema } from "@/lib/validators";
import {
  deleteAdminSkill,
  updateAdminSkill,
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
    const parsed = skillInputSchema.partial().safeParse(body);

    if (!parsed.success) {
      return fail("Invalid payload", 400, parsed.error.flatten());
    }

    const updated = await updateAdminSkill(id, parsed.data, session.user.id);
    return ok(updated);
  } catch {
    return fail("Failed to update skill", 500);
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
    await deleteAdminSkill(id);
    return ok({ deleted: true });
  } catch {
    return fail("Failed to delete skill", 500);
  }
}
