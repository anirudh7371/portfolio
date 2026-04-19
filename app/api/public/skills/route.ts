import { ok, fail } from "@/lib/api-response";
import { getPublicSkillsGrouped } from "@/services/public-content-service";

export async function GET() {
  try {
    const skills = await getPublicSkillsGrouped();
    return ok(skills);
  } catch {
    return fail("Failed to load skills", 500);
  }
}
