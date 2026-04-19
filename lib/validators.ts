import { z } from "zod";

export const contactInputSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(3).max(160),
  message: z.string().min(10).max(5000),
  website: z.string().max(0).optional(),
  formStartedAt: z.number().int().positive().optional(),
});

export const skillInputSchema = z.object({
  name: z.string().min(1).max(80),
  category: z.string().min(1).max(80),
  level: z.number().min(0).max(100),
  iconKey: z.string().max(80).optional().nullable(),
  displayOrder: z.number().int().min(0).default(0),
});

export const experienceInputSchema = z.object({
  title: z.string().min(1).max(120),
  organization: z.string().min(1).max(120),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional().nullable(),
  summary: z.string().min(1).max(3000),
  achievements: z.array(z.string().min(1).max(600)).min(1),
  displayOrder: z.number().int().min(0).default(0),
});

export const projectInputSchema = z.object({
  title: z.string().min(1).max(180),
  slug: z.string().min(3).max(180).regex(/^[a-z0-9-]+$/),
  summary: z.string().min(1).max(300),
  description: z.string().min(1).max(8000),
  githubUrl: z.string().url(),
  liveUrl: z.string().url().optional().nullable(),
  thumbnailUrl: z.string().url().optional().nullable(),
  featured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  displayOrder: z.number().int().min(0).default(0),
  skillIds: z.array(z.string().min(1)).default([]),
});

export const serviceInputSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(2500),
  pricingModel: z.string().min(1).max(120),
  availability: z.enum(["OPEN", "LIMITED", "CLOSED"]).default("OPEN"),
  displayOrder: z.number().int().min(0).default(0),
});

export const profileUpdateSchema = z.object({
  headline: z.string().min(1).max(120),
  subtitle: z.string().min(1).max(180),
  heroDescription: z.string().min(1).max(2500),
  aboutSummary: z.string().min(1).max(2500),
  aboutDetails: z.string().min(1).max(4000),
  location: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().min(7).max(24),
  resumeUrl: z.string().url(),
  ctaPrimaryLabel: z.string().min(1).max(80),
  ctaPrimaryHref: z.string().min(1).max(2000),
  ctaSecondaryLabel: z.string().min(1).max(80),
  ctaSecondaryHref: z.string().min(1).max(2000),
});

export const contactMessageStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["UNREAD", "READ", "REPLIED", "ARCHIVED"]),
});

export const chatQuerySchema = z.object({
  question: z.string().min(2).max(4000),
  visitorSessionId: z.string().min(6).max(120),
});

export const chatFeedbackSchema = z.object({
  messageId: z.string().min(1),
  feedback: z.enum(["UP", "DOWN"]),
  note: z.string().max(500).optional(),
});
