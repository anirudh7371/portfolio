import { prisma } from "@/lib/prisma";
import {
  achievementsSeed,
  profileSeed,
  projectsSeed,
  servicesSeed,
  skillsSeed,
  experiencesSeed,
} from "@/lib/portfolio-data";

export async function getPublicProfile() {
  try {
    const profile = await prisma.profile.findUnique({ where: { slug: "primary" } });
    return profile ?? profileSeed;
  } catch {
    return profileSeed;
  }
}

export async function getPublicSkillsGrouped() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: "asc" }, { displayOrder: "asc" }],
    });

    const grouped = skills.reduce<Record<string, string[]>>((acc, skill) => {
      const list = acc[skill.category] ?? [];
      list.push(skill.name);
      acc[skill.category] = list;
      return acc;
    }, {});

    return Object.entries(grouped).map(([title, skillNames]) => ({
      title,
      skills: skillNames,
    }));
  } catch {
    const grouped = skillsSeed.reduce<Record<string, string[]>>((acc, skill) => {
      const list = acc[skill.category] ?? [];
      list.push(skill.name);
      acc[skill.category] = list;
      return acc;
    }, {});

    return Object.entries(grouped).map(([title, skillNames]) => ({
      title,
      skills: skillNames,
    }));
  }
}

export async function getPublicExperience() {
  try {
    const entries = await prisma.experience.findMany({
      orderBy: [{ displayOrder: "asc" }, { startDate: "desc" }],
    });

    return entries.map((entry) => ({
      id: entry.id,
      role: entry.title,
      company: entry.organization,
      period: formatPeriod(entry.startDate, entry.endDate),
      summary: entry.summary,
      highlights: Array.isArray(entry.achievements)
        ? entry.achievements
        : ([] as string[]),
    }));
  } catch {
    return experiencesSeed.map((entry) => ({
      id: `${entry.organization}-${entry.title}`,
      role: entry.title,
      company: entry.organization,
      period: formatPeriod(
        new Date(entry.startDate),
        entry.endDate ? new Date(entry.endDate) : null,
      ),
      summary: entry.summary,
      highlights: entry.achievements,
    }));
  }
}

export async function getPublicProjects(options?: {
  featured?: boolean;
  tech?: string;
  limit?: number;
}) {
  try {
    const records = await prisma.project.findMany({
      where: {
        status: "PUBLISHED",
        ...(options?.featured ? { featured: true } : {}),
      },
      include: {
        skills: {
          include: { skill: true },
          orderBy: { displayOrder: "asc" },
        },
      },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      take: options?.limit,
    });

    const projects = records.map((record) => ({
      id: record.id,
      title: record.title,
      slug: record.slug,
      summary: record.summary,
      description: record.description,
      github: record.githubUrl,
      live: record.liveUrl,
      featured: record.featured,
      tech: record.skills.map((item) => item.skill.name),
    }));

    if (!options?.tech) {
      return projects;
    }

    return projects.filter((project) =>
      project.tech.some((item) => item.toLowerCase() === options.tech?.toLowerCase()),
    );
  } catch {
    const fallback = projectsSeed
      .filter((project) => (options?.featured ? project.featured : true))
      .map((project) => ({
        id: project.slug,
        title: project.title,
        slug: project.slug,
        summary: project.summary,
        description: project.description,
        github: project.githubUrl,
        live: project.liveUrl,
        featured: project.featured,
        tech: project.tech,
      }));

    const filtered = options?.tech
      ? fallback.filter((project) =>
          project.tech.some((item) => item.toLowerCase() === options.tech?.toLowerCase()),
        )
      : fallback;

    return options?.limit ? filtered.slice(0, options.limit) : filtered;
  }
}

export async function getPublicProjectBySlug(slug: string) {
  const projects = await getPublicProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getPublicServices() {
  try {
    const services = await prisma.service.findMany({
      where: { availability: { not: "CLOSED" } },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });

    return services.map((service) => ({
      id: service.id,
      title: service.title,
      description: service.description,
      pricingModel: service.pricingModel,
      availability: service.availability,
    }));
  } catch {
    return servicesSeed.map((service) => ({
      id: service.title,
      title: service.title,
      description: service.description,
      pricingModel: service.pricingModel,
      availability: service.availability,
    }));
  }
}

export async function getPublicAchievements() {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "achievements" },
    });

    if (!setting?.value || !Array.isArray(setting.value)) {
      return achievementsSeed;
    }

    return setting.value;
  } catch {
    return achievementsSeed;
  }
}

function formatPeriod(startDate: Date, endDate: Date | null): string {
  const startLabel = startDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  if (!endDate) {
    return `${startLabel} - Present`;
  }

  const endLabel = endDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  return `${startLabel} - ${endLabel}`;
}
