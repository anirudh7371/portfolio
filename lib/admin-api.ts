import { fail } from "@/lib/api-response";
import { getAdminSession } from "@/lib/admin-auth";

export async function requireAdminOrResponse() {
  const session = await getAdminSession();

  if (!session) {
    return {
      session: null,
      response: fail("Unauthorized", 401),
    };
  }

  return {
    session,
    response: null,
  };
}
