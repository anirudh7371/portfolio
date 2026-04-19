import { fail, ok } from "@/lib/api-response";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { contactInputSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const userAgent = request.headers.get("user-agent") ?? null;
    const limitCheck = checkRateLimit(`contact:${ip}`, 5, 60_000);

    if (!limitCheck.allowed) {
      return fail("Too many requests. Please try again shortly.", 429, {
        retryAfterMs: limitCheck.retryAfterMs,
      });
    }

    const body = await request.json();
    const parsed = contactInputSchema.safeParse(body);

    if (!parsed.success) {
      return fail("Invalid payload", 400, parsed.error.flatten());
    }

    if (parsed.data.website && parsed.data.website.trim().length > 0) {
      return ok({ received: true, accepted: false });
    }

    if (parsed.data.formStartedAt) {
      const elapsedMs = Date.now() - parsed.data.formStartedAt;
      if (elapsedMs < 3_000) {
        return fail("Suspicious form submission", 400);
      }
    }

    await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        subject: parsed.data.subject,
        message: parsed.data.message,
        sourceIp: ip,
        userAgent,
      },
    });

    if (process.env.CONTACT_WEBHOOK_URL) {
      void fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          subject: parsed.data.subject,
          message: parsed.data.message,
          sourceIp: ip,
          userAgent,
          submittedAt: new Date().toISOString(),
        }),
      }).catch((error) => {
        logger.warn({ err: error }, "Failed to send contact webhook notification");
      });
    }

    return ok({ received: true });
  } catch (error) {
    logger.error({ err: error }, "Failed to persist contact form");
    return fail("Failed to submit contact form", 500);
  }
}
