import { fail, ok } from "@/lib/api-response";
import { requireAdminOrResponse } from "@/lib/admin-api";
import { experienceInputSchema } from "@/lib/validators";
import {
  createAdminExperience,
  listAdminExperience,
} from "@/services/admin-content-service";

export async function GET() {
  const { response } = await requireAdminOrResponse();
  if (response) {
    return response;
  }

  try {
    const experience = await listAdminExperience();
    return ok(experience);
  } catch {
    return fail("Failed to load experience", 500);
  }
}

export async function POST(request: Request) {
  const { response } = await requireAdminOrResponse();
  if (response) {
    return response;
  }

  try {
    const body = await request.json();
    const parsed = experienceInputSchema.safeParse(body);

    if (!parsed.success) {
      return fail("Invalid payload", 400, parsed.error.flatten());
    }

    const created = await createAdminExperience({
      title: parsed.data.title,
      organization: parsed.data.organization,
      startDate: new Date(parsed.data.startDate),
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
      summary: parsed.data.summary,
      achievements: parsed.data.achievements,
      displayOrder: parsed.data.displayOrder,
    });

    return ok(created, { status: 201 });
  } catch {
    return fail("Failed to create experience", 500);
  }
}
