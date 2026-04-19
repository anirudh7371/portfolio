import { fail, ok } from "@/lib/api-response";
import { requireAdminOrResponse } from "@/lib/admin-api";
import { reindexRagDocuments } from "@/services/chat-service";

export async function POST() {
  const { response } = await requireAdminOrResponse();
  if (response) {
    return response;
  }

  try {
    const output = await reindexRagDocuments();
    return ok(output);
  } catch {
    return fail("Failed to reindex documents", 500);
  }
}
