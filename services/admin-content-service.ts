import {
  type Prisma,
  ContactMessageStatus,
  type ProjectStatus,
  type Role,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getDashboardMetrics() {
  const [projects, skills, experiences, services, unreadMessages] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.experience.count(),
    prisma.service.count(),
    prisma.contactMessage.count({ where: { status: ContactMessageStatus.UNREAD } }),
  ]);

  return {
    projects,
    skills,
    experiences,
    services,
    unreadMessages,
  };
}

export async function listAdminProjects() {
  return prisma.project.findMany({
    include: {
      skills: {
        include: { skill: true },
        orderBy: { displayOrder: "asc" },
      },
    },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function createAdminProject(
  input: {
    title: string;
    slug: string;
    summary: string;
    description: string;
    githubUrl: string;
    liveUrl?: string | null;
    thumbnailUrl?: string | null;
    featured: boolean;
    status: ProjectStatus;
    displayOrder: number;
    skillIds: string[];
  },
  updatedById?: string,
) {
  return prisma.project.create({
    data: {
      title: input.title,
      slug: input.slug,
      summary: input.summary,
      description: input.description,
      githubUrl: input.githubUrl,
      liveUrl: input.liveUrl,
      thumbnailUrl: input.thumbnailUrl,
      featured: input.featured,
      status: input.status,
      displayOrder: input.displayOrder,
      updatedById,
      skills: {
        create: input.skillIds.map((skillId, index) => ({
          skillId,
          displayOrder: index + 1,
        })),
      },
    },
  });
}

export async function updateAdminProject(
  id: string,
  input: Partial<{
    title: string;
    slug: string;
    summary: string;
    description: string;
    githubUrl: string;
    liveUrl: string | null;
    thumbnailUrl: string | null;
    featured: boolean;
    status: ProjectStatus;
    displayOrder: number;
    skillIds: string[];
  }>,
  updatedById?: string,
) {
  return prisma.$transaction(async (tx) => {
    if (input.skillIds) {
      await tx.projectSkill.deleteMany({ where: { projectId: id } });
    }

    return tx.project.update({
      where: { id },
      data: {
        ...input,
        updatedById,
        ...(input.skillIds
          ? {
              skills: {
                create: input.skillIds.map((skillId, index) => ({
                  skillId,
                  displayOrder: index + 1,
                })),
              },
            }
          : {}),
      },
      include: {
        skills: {
          include: { skill: true },
        },
      },
    });
  });
}

export async function deleteAdminProject(id: string) {
  return prisma.project.delete({ where: { id } });
}

export async function listAdminSkills() {
  return prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { displayOrder: "asc" }],
  });
}

export async function createAdminSkill(
  data: Prisma.SkillUncheckedCreateInput,
  updatedById?: string,
) {
  return prisma.skill.create({ data: { ...data, updatedById } });
}

export async function updateAdminSkill(
  id: string,
  data: Prisma.SkillUncheckedUpdateInput,
  updatedById?: string,
) {
  return prisma.skill.update({ where: { id }, data: { ...data, updatedById } });
}

export async function deleteAdminSkill(id: string) {
  return prisma.skill.delete({ where: { id } });
}

export async function listAdminExperience() {
  return prisma.experience.findMany({
    orderBy: [{ displayOrder: "asc" }, { startDate: "desc" }],
  });
}

export async function createAdminExperience(data: Prisma.ExperienceCreateInput) {
  return prisma.experience.create({ data });
}

export async function updateAdminExperience(
  id: string,
  data: Prisma.ExperienceUpdateInput,
) {
  return prisma.experience.update({ where: { id }, data });
}

export async function deleteAdminExperience(id: string) {
  return prisma.experience.delete({ where: { id } });
}

export async function getAdminProfile() {
  return prisma.profile.findUnique({ where: { slug: "primary" } });
}

export async function updateAdminProfile(
  data: Prisma.ProfileUncheckedUpdateInput,
  updatedById?: string,
) {
  return prisma.profile.upsert({
    where: { slug: "primary" },
    update: { ...data, updatedById },
    create: {
      slug: "primary",
      headline: String(data.headline ?? "Anirudh"),
      subtitle: String(data.subtitle ?? "Software Developer and AI/ML Engineer"),
      heroDescription: String(data.heroDescription ?? ""),
      aboutSummary: String(data.aboutSummary ?? ""),
      aboutDetails: String(data.aboutDetails ?? ""),
      location: String(data.location ?? ""),
      email: String(data.email ?? ""),
      phone: String(data.phone ?? ""),
      resumeUrl: String(data.resumeUrl ?? ""),
      ctaPrimaryLabel: String(data.ctaPrimaryLabel ?? "View Projects"),
      ctaPrimaryHref: String(data.ctaPrimaryHref ?? "#projects"),
      ctaSecondaryLabel: String(data.ctaSecondaryLabel ?? "Get In Touch"),
      ctaSecondaryHref: String(data.ctaSecondaryHref ?? "#contact"),
      updatedById,
    },
  });
}

export async function listAdminServices() {
  return prisma.service.findMany({ orderBy: [{ displayOrder: "asc" }] });
}

export async function createAdminService(
  data: Prisma.ServiceUncheckedCreateInput,
  updatedById?: string,
) {
  return prisma.service.create({ data: { ...data, updatedById } });
}

export async function updateAdminService(
  id: string,
  data: Prisma.ServiceUncheckedUpdateInput,
  updatedById?: string,
) {
  return prisma.service.update({ where: { id }, data: { ...data, updatedById } });
}

export async function deleteAdminService(id: string) {
  return prisma.service.delete({ where: { id } });
}

export async function listAdminContactMessages() {
  return prisma.contactMessage.findMany({
    orderBy: [{ createdAt: "desc" }],
    take: 100,
  });
}

export async function updateAdminContactMessageStatus(
  id: string,
  status: ContactMessageStatus,
  updatedById?: string,
) {
  return prisma.contactMessage.update({
    where: { id },
    data: {
      status,
      updatedById,
    },
  });
}

export async function listAdminUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateUserRole(id: string, role: Role) {
  return prisma.user.update({
    where: { id },
    data: { role },
  });
}
