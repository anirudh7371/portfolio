import { fail, ok } from "@/lib/api-response";
import { chatFeedbackSchema } from "@/lib/validators";
import { recordChatFeedback } from "@/services/chat-service";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = chatFeedbackSchema.safeParse(body);

    if (!parsed.success) {
      return fail("Invalid payload", 400, parsed.error.flatten());
    }

    await recordChatFeedback(
      parsed.data.messageId,
      parsed.data.feedback,
      parsed.data.note,
    );

    return ok({ recorded: true });
  } catch {
    return fail("Failed to record feedback", 500);
  }
}
