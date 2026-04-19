import { fail, ok } from "@/lib/api-response";
import { requireAdminOrResponse } from "@/lib/admin-api";
import { skillInputSchema } from "@/lib/validators";
import {
  createAdminSkill,
  listAdminSkills,
} from "@/services/admin-content-service";

export async function GET() {
  const { response } = await requireAdminOrResponse();
  if (response) {
    return response;
  }

  try {
    const skills = await listAdminSkills();
    return ok(skills);
  } catch {
    return fail("Failed to load skills", 500);
  }
}

export async function POST(request: Request) {
  const { session, response } = await requireAdminOrResponse();
  if (response || !session) {
    return response;
  }

  try {
    const body = await request.json();
    const parsed = skillInputSchema.safeParse(body);

    if (!parsed.success) {
      return fail("Invalid payload", 400, parsed.error.flatten());
    }

    const created = await createAdminSkill(parsed.data, session.user.id);
    return ok(created, { status: 201 });
  } catch {
    return fail("Failed to create skill", 500);
  }
}
