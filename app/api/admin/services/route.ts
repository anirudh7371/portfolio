import { fail, ok } from "@/lib/api-response";
import { requireAdminOrResponse } from "@/lib/admin-api";
import { serviceInputSchema } from "@/lib/validators";
import {
  createAdminService,
  listAdminServices,
} from "@/services/admin-content-service";

export async function GET() {
  const { response } = await requireAdminOrResponse();
  if (response) {
    return response;
  }

  try {
    const services = await listAdminServices();
    return ok(services);
  } catch {
    return fail("Failed to load services", 500);
  }
}

export async function POST(request: Request) {
  const { session, response } = await requireAdminOrResponse();
  if (response || !session) {
    return response;
  }

  try {
    const body = await request.json();
    const parsed = serviceInputSchema.safeParse(body);

    if (!parsed.success) {
      return fail("Invalid payload", 400, parsed.error.flatten());
    }

    const created = await createAdminService(parsed.data, session.user.id);
    return ok(created, { status: 201 });
  } catch {
    return fail("Failed to create service", 500);
  }
}
