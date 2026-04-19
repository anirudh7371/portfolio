import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import {
  getPublicExperience,
  getPublicProfile,
  getPublicProjects,
  getPublicServices,
  getPublicSkillsGrouped,
} from "@/services/public-content-service";

type ChatAnswer = {
  answer: string;
  confidence: number;
  sources: string[];
  model: string;
  assistantMessageId?: string;
};

export async function answerPortfolioQuestion(
  question: string,
  visitorSessionId: string,
): Promise<ChatAnswer> {
  const context = await buildContext();
  const startedAt = Date.now();

  let result: ChatAnswer;
  const modelName = process.env.CHAT_MODEL ?? "gemini-2.5-flash";

  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: modelName });

    const prompt = [
      "You are Anirudh's portfolio assistant.",
      "Only answer using the provided structured context.",
      "If the context does not contain the answer, say that directly and suggest contacting Anirudh.",
      "Respond in concise professional tone.",
      "Return plain text answer only.",
      "Context:",
      context,
      "Question:",
      question,
    ].join("\n\n");

    const generated = await model.generateContent(prompt);
    const answer = generated.response.text();

    result = {
      answer,
      confidence: 0.86,
      sources: inferSources(question),
      model: modelName,
    };
  } else {
    result = {
      answer: fallbackAnswer(question),
      confidence: 0.64,
      sources: inferSources(question),
      model: "rule-based-fallback",
    };
  }

  await persistChat(visitorSessionId, question, result, Date.now() - startedAt);
  return result;
}

export async function recordChatFeedback(
  messageId: string,
  feedback: "UP" | "DOWN",
  note?: string,
) {
  await prisma.chatMessage.update({
    where: { id: messageId },
    data: {
      feedback,
    },
  });

  if (note?.trim()) {
    logger.info({ messageId, feedback, note }, "Chat feedback note received");
  }
}

export async function reindexRagDocuments() {
  const [profile, skills, projects, experience, services] = await Promise.all([
    getPublicProfile(),
    getPublicSkillsGrouped(),
    getPublicProjects(),
    getPublicExperience(),
    getPublicServices(),
  ]);

  const docs = [
    {
      sourceType: "profile",
      sourceId: "primary",
      title: "Profile",
      content: JSON.stringify(profile),
    },
    {
      sourceType: "skills",
      sourceId: "all",
      title: "Skills",
      content: JSON.stringify(skills),
    },
    {
      sourceType: "projects",
      sourceId: "all",
      title: "Projects",
      content: JSON.stringify(projects),
    },
    {
      sourceType: "experience",
      sourceId: "all",
      title: "Experience",
      content: JSON.stringify(experience),
    },
    {
      sourceType: "services",
      sourceId: "all",
      title: "Services",
      content: JSON.stringify(services),
    },
  ];

  for (const document of docs) {
    const record = await prisma.ragDocument.upsert({
      where: {
        sourceType_sourceId: {
          sourceType: document.sourceType,
          sourceId: document.sourceId,
        },
      },
      update: {
        title: document.title,
        content: document.content,
      },
      create: {
        sourceType: document.sourceType,
        sourceId: document.sourceId,
        title: document.title,
        content: document.content,
      },
    });

    await prisma.ragChunk.deleteMany({ where: { documentId: record.id } });
    const chunks = chunkText(document.content, 500);

    for (let index = 0; index < chunks.length; index += 1) {
      const text = chunks[index] ?? "";
      await prisma.ragChunk.create({
        data: {
          documentId: record.id,
          chunkIndex: index,
          text,
          metadata: {
            sourceType: document.sourceType,
            sourceId: document.sourceId,
          },
        },
      });
    }
  }

  return {
    documents: docs.length,
  };
}

async function buildContext() {
  const [profile, skills, projects, experience, services] = await Promise.all([
    getPublicProfile(),
    getPublicSkillsGrouped(),
    getPublicProjects({ limit: 6 }),
    getPublicExperience(),
    getPublicServices(),
  ]);

  return JSON.stringify({ profile, skills, projects, experience, services });
}

async function persistChat(
  visitorSessionId: string,
  question: string,
  result: ChatAnswer,
  latencyMs: number,
) {
  try {
    const existingConversation = await prisma.chatConversation.findFirst({
      where: { visitorSessionId },
      orderBy: { createdAt: "desc" },
    });

    const conversation = existingConversation
      ? await prisma.chatConversation.update({
          where: { id: existingConversation.id },
          data: { updatedAt: new Date() },
        })
      : await prisma.chatConversation.create({
          data: {
            visitorSessionId,
          },
        });

    await prisma.chatMessage.create({
      data: {
        conversationId: conversation.id,
        role: "user",
        content: question,
      },
    });

    const assistantMessage = await prisma.chatMessage.create({
      data: {
        conversationId: conversation.id,
        role: "assistant",
        content: result.answer,
        confidence: result.confidence,
        sources: result.sources,
        model: result.model,
        latencyMs,
      },
    });

    result.assistantMessageId = assistantMessage.id;
  } catch (error) {
    logger.warn({ err: error }, "Failed to persist chat conversation");
  }
}

function inferSources(question: string): string[] {
  const q = question.toLowerCase();
  const sources = ["profile"];

  if (q.includes("project")) {
    sources.push("projects");
  }
  if (q.includes("skill") || q.includes("tech")) {
    sources.push("skills");
  }
  if (q.includes("experience") || q.includes("intern")) {
    sources.push("experience");
  }
  if (q.includes("service") || q.includes("hire")) {
    sources.push("services");
  }
  if (q.includes("contact") || q.includes("email") || q.includes("phone")) {
    sources.push("profile.contact");
  }

  return Array.from(new Set(sources));
}

function getConfiguredContactAnswer(): string {
  const email = process.env.PORTFOLIO_CONTACT_EMAIL?.trim();
  const phone = process.env.PORTFOLIO_CONTACT_PHONE?.trim();
  const linkedIn = process.env.PORTFOLIO_CONTACT_LINKEDIN?.trim();
  const contactParts: string[] = [];

  if (email) {
    contactParts.push(`email at ${email}`);
  }

  if (phone) {
    contactParts.push(`call ${phone}`);
  }

  if (linkedIn) {
    contactParts.push(`connect via LinkedIn at ${linkedIn}`);
  }

  if (contactParts.length === 0) {
    return "You can use the contact details provided in Anirudh's portfolio profile or contact section.";
  }

  return `You can reach Anirudh by ${contactParts.join(", ")}.`;
}

function fallbackAnswer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("contact") || q.includes("email") || q.includes("phone")) {
    return getConfiguredContactAnswer();
  }

  if (q.includes("skill") || q.includes("tech")) {
    return "Anirudh works across AI/ML and full-stack engineering, including Deep Learning, NLP, Generative AI, TensorFlow, Scikit-learn, LangChain, Python, Next.js, and PostgreSQL.";
  }

  if (q.includes("project")) {
    return "Highlighted projects include FinWise (AI finance assistant), Job Recommendation System (FAISS semantic matching), and an Automatic Parking System built with reinforcement learning in Unity.";
  }

  if (q.includes("experience") || q.includes("intern")) {
    return "Anirudh has interned as a Generative AI Developer at CodeBiceps and as an ML/AI Developer at KuppiSmart, and currently mentors AI/ML learners at VIT Vellore.";
  }

  return "I can help with Anirudh's profile, projects, skills, experience, services, and contact details. Ask a specific question and I will answer from portfolio context only.";
}

function chunkText(text: string, chunkSize: number): string[] {
  const chunks: string[] = [];
  let index = 0;

  while (index < text.length) {
    chunks.push(text.slice(index, index + chunkSize));
    index += chunkSize;
  }

  return chunks;
}
