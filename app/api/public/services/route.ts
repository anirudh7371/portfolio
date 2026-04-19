import { fail, ok } from "@/lib/api-response";
import { getPublicServices } from "@/services/public-content-service";

export async function GET() {
  try {
    const services = await getPublicServices();
    return ok(services);
  } catch {
    return fail("Failed to load services", 500);
  }
}
