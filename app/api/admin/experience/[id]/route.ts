import { fail, ok } from "@/lib/api-response";
import { requireAdminOrResponse } from "@/lib/admin-api";
import { experienceInputSchema } from "@/lib/validators";
import {
  deleteAdminExperience,
  updateAdminExperience,
} from "@/services/admin-content-service";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { response } = await requireAdminOrResponse();
  if (response) {
    return response;
  }

  try {
    const { id } = await context.params;
    const body = await request.json();
    const parsed = experienceInputSchema.partial().safeParse(body);

    if (!parsed.success) {
      return fail("Invalid payload", 400, parsed.error.flatten());
    }

    const updated = await updateAdminExperience(id, {
      ...(parsed.data.title ? { title: parsed.data.title } : {}),
      ...(parsed.data.organization ? { organization: parsed.data.organization } : {}),
      ...(parsed.data.startDate
        ? { startDate: new Date(parsed.data.startDate) }
        : {}),
      ...(parsed.data.endDate !== undefined
        ? {
            endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
          }
        : {}),
      ...(parsed.data.summary ? { summary: parsed.data.summary } : {}),
      ...(parsed.data.achievements ? { achievements: parsed.data.achievements } : {}),
      ...(parsed.data.displayOrder !== undefined
        ? { displayOrder: parsed.data.displayOrder }
        : {}),
    });

    return ok(updated);
  } catch {
    return fail("Failed to update experience", 500);
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
    await deleteAdminExperience(id);
    return ok({ deleted: true });
  } catch {
    return fail("Failed to delete experience", 500);
  }
}
