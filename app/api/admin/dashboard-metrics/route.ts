import { fail, ok } from "@/lib/api-response";
import { requireAdminOrResponse } from "@/lib/admin-api";
import { getDashboardMetrics } from "@/services/admin-content-service";

export async function GET() {
  const { response } = await requireAdminOrResponse();
  if (response) {
    return response;
  }

  try {
    const metrics = await getDashboardMetrics();
    return ok(metrics);
  } catch {
    return fail("Failed to load metrics", 500);
  }
}
