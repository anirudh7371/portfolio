import bcrypt from "bcryptjs";
import {
  AvailabilityStatus,
  ProjectStatus,
  Role,
} from "@prisma/client";
import { prisma } from "../lib/prisma";
import {
  achievementsSeed,
  contactSeed,
  experiencesSeed,
  profileSeed,
  projectsSeed,
  servicesSeed,
  skillsSeed,
} from "@/lib/portfolio-data";

async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL ?? profileSeed.email;
  const adminPassword = process.env.ADMIN_PASSWORD;

  const passwordHash = adminPassword
    ? await bcrypt.hash(adminPassword, 10)
    : undefined;

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: Role.ADMIN,
      ...(passwordHash ? { passwordHash } : {}),
    },
    create: {
      email: adminEmail,
      name: "Anirudh",
      role: Role.ADMIN,
      ...(passwordHash ? { passwordHash } : {}),
    },
  });
}

async function seedProfile() {
  await prisma.profile.upsert({
    where: { slug: "primary" },
    update: {
      ...profileSeed,
    },
    create: {
      slug: "primary",
      ...profileSeed,
    },
  });
}

async function seedSkills() {
  for (const skill of skillsSeed) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: skill,
      create: skill,
    });
  }
}

async function seedExperience() {
  for (const experience of experiencesSeed) {
    await prisma.experience.upsert({
      where: {
        title_organization_startDate: {
          title: experience.title,
          organization: experience.organization,
          startDate: new Date(experience.startDate),
        },
      },
      update: {
        title: experience.title,
        organization: experience.organization,
        startDate: new Date(experience.startDate),
        endDate: experience.endDate ? new Date(experience.endDate) : null,
        summary: experience.summary,
        achievements: experience.achievements,
        displayOrder: experience.displayOrder,
      },
      create: {
        title: experience.title,
        organization: experience.organization,
        startDate: new Date(experience.startDate),
        endDate: experience.endDate ? new Date(experience.endDate) : null,
        summary: experience.summary,
        achievements: experience.achievements,
        displayOrder: experience.displayOrder,
      },
    });
  }
}

async function seedProjects() {
  for (const project of projectsSeed) {
    const record = await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        summary: project.summary,
        description: project.description,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        featured: project.featured,
        status: project.status as ProjectStatus,
        displayOrder: project.displayOrder,
      },
      create: {
        title: project.title,
        slug: project.slug,
        summary: project.summary,
        description: project.description,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        featured: project.featured,
        status: project.status as ProjectStatus,
        displayOrder: project.displayOrder,
      },
    });

    for (let index = 0; index < project.tech.length; index += 1) {
      const skillName = project.tech[index] ?? "";
      const skill = await prisma.skill.upsert({
        where: { name: skillName },
        update: {
          category: "Project Technologies",
          level: 80,
        },
        create: {
          name: skillName,
          category: "Project Technologies",
          level: 80,
          displayOrder: 100 + index,
        },
      });

      await prisma.projectSkill.upsert({
        where: {
          projectId_skillId: {
            projectId: record.id,
            skillId: skill.id,
          },
        },
        update: { displayOrder: index + 1 },
        create: {
          projectId: record.id,
          skillId: skill.id,
          displayOrder: index + 1,
        },
      });
    }
  }
}

async function seedServices() {
  for (const service of servicesSeed) {
    const availability = toAvailabilityStatus(service.availability);

    await prisma.service.upsert({
      where: { title: service.title },
      update: {
        description: service.description,
        pricingModel: service.pricingModel,
        availability,
        displayOrder: service.displayOrder,
      },
      create: {
        title: service.title,
        description: service.description,
        pricingModel: service.pricingModel,
        availability,
        displayOrder: service.displayOrder,
      },
    });
  }
}

function toAvailabilityStatus(value: string): AvailabilityStatus {
  switch (value.toUpperCase()) {
    case "OPEN":
      return AvailabilityStatus.OPEN;
    case "LIMITED":
      return AvailabilityStatus.LIMITED;
    case "CLOSED":
      return AvailabilityStatus.CLOSED;
    default:
      return AvailabilityStatus.OPEN;
  }
}

async function seedSiteSettings() {
  await prisma.siteSetting.upsert({
    where: { key: "achievements" },
    update: { value: achievementsSeed },
    create: { key: "achievements", value: achievementsSeed },
  });

  await prisma.siteSetting.upsert({
    where: { key: "contactLinks" },
    update: { value: contactSeed },
    create: { key: "contactLinks", value: contactSeed },
  });
}

async function main() {
  await seedAdmin();
  await seedProfile();
  await seedSkills();
  await seedExperience();
  await seedProjects();
  await seedServices();
  await seedSiteSettings();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
