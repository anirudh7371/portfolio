import { fail, ok } from "@/lib/api-response";
import { requireAdminOrResponse } from "@/lib/admin-api";
import { serviceInputSchema } from "@/lib/validators";
import {
  deleteAdminService,
  updateAdminService,
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
    const parsed = serviceInputSchema.partial().safeParse(body);

    if (!parsed.success) {
      return fail("Invalid payload", 400, parsed.error.flatten());
    }

    const updated = await updateAdminService(id, parsed.data, session.user.id);
    return ok(updated);
  } catch {
    return fail("Failed to update service", 500);
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
    await deleteAdminService(id);
    return ok({ deleted: true });
  } catch {
    return fail("Failed to delete service", 500);
  }
}
