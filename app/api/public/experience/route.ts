import { ok, fail } from "@/lib/api-response";
import { getPublicExperience } from "@/services/public-content-service";

export async function GET() {
  try {
    const experience = await getPublicExperience();
    return ok(experience);
  } catch {
    return fail("Failed to load experience", 500);
  }
}
