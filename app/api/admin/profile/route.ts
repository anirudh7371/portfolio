import { fail, ok } from "@/lib/api-response";
import { requireAdminOrResponse } from "@/lib/admin-api";
import { profileUpdateSchema } from "@/lib/validators";
import { getAdminProfile, updateAdminProfile } from "@/services/admin-content-service";

export async function GET() {
  const { response } = await requireAdminOrResponse();
  if (response) {
    return response;
  }

  try {
    const profile = await getAdminProfile();
    return ok(profile);
  } catch {
    return fail("Failed to load profile", 500);
  }
}

export async function PUT(request: Request) {
  const { session, response } = await requireAdminOrResponse();
  if (response || !session) {
    return response;
  }

  try {
    const body = await request.json();
    const parsed = profileUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return fail("Invalid payload", 400, parsed.error.flatten());
    }

    const updated = await updateAdminProfile(parsed.data, session.user.id);
    return ok(updated);
  } catch {
    return fail("Failed to update profile", 500);
  }
}
