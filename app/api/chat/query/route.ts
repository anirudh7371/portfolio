import { fail, ok } from "@/lib/api-response";
import { checkRateLimit } from "@/lib/rate-limit";
import { chatQuerySchema } from "@/lib/validators";
import { answerPortfolioQuestion } from "@/services/chat-service";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const body = await request.json();
    const parsed = chatQuerySchema.safeParse(body);

    if (!parsed.success) {
      return fail("Invalid payload", 400, parsed.error.flatten());
    }

    const limit = checkRateLimit(
      `chat:${ip}:${parsed.data.visitorSessionId}`,
      30,
      60_000,
    );

    if (!limit.allowed) {
      return fail("Too many chat requests", 429, {
        retryAfterMs: limit.retryAfterMs,
      });
    }

    const output = await answerPortfolioQuestion(
      parsed.data.question,
      parsed.data.visitorSessionId,
    );

    return ok(output);
  } catch {
    return fail("Failed to process chat query", 500);
  }
}
