import { ContactMessageStatus } from "@prisma/client";
import { fail, ok } from "@/lib/api-response";
import { requireAdminOrResponse } from "@/lib/admin-api";
import { contactMessageStatusSchema } from "@/lib/validators";
import {
  listAdminContactMessages,
  updateAdminContactMessageStatus,
} from "@/services/admin-content-service";

export async function GET() {
  const { response } = await requireAdminOrResponse();
  if (response) {
    return response;
  }

  try {
    const messages = await listAdminContactMessages();
    return ok(messages);
  } catch {
    return fail("Failed to load contact messages", 500);
  }
}

export async function PATCH(request: Request) {
  const { session, response } = await requireAdminOrResponse();
  if (response || !session) {
    return response;
  }

  try {
    const body = await request.json();
    const parsed = contactMessageStatusSchema.safeParse(body);

    if (!parsed.success) {
      return fail("Invalid payload", 400, parsed.error.flatten());
    }

    const updated = await updateAdminContactMessageStatus(
      parsed.data.id,
      parsed.data.status as ContactMessageStatus,
      session.user.id,
    );

    return ok(updated);
  } catch {
    return fail("Failed to update contact message", 500);
  }
}
