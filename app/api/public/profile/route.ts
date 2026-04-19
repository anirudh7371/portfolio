import { ok, fail } from "@/lib/api-response";
import { getPublicProfile } from "@/services/public-content-service";

export async function GET() {
  try {
    const profile = await getPublicProfile();
    return ok(profile);
  } catch {
    return fail("Failed to load profile", 500);
  }
}
