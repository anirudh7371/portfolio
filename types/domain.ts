export type ProfileSeed = {
  headline: string;
  subtitle: string;
  heroDescription: string;
  aboutSummary: string;
  aboutDetails: string;
  location: string;
  email: string;
  phone: string;
  resumeUrl: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
};

export type SkillSeed = {
  name: string;
  category: string;
  level: number;
  displayOrder: number;
};

export type ExperienceSeed = {
  title: string;
  organization: string;
  startDate: string;
  endDate: string | null;
  summary: string;
  achievements: string[];
  displayOrder: number;
};

export type ProjectSeed = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  githubUrl: string;
  liveUrl: string | null;
  featured: boolean;
  status: string;
  displayOrder: number;
  tech: string[];
};

export type ServiceSeed = {
  title: string;
  description: string;
  pricingModel: string;
  availability: string;
  displayOrder: number;
};

export type AchievementSeed = {
  title: string;
  detail: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
