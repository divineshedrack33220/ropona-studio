import siteJson from "@/content/site.json";
import projectsJson from "@/content/projects.json";
import servicesJson from "@/content/services.json";
import processJson from "@/content/process.json";
import aboutJson from "@/content/about.json";
import experienceJson from "@/content/experience.json";
import directorModesJson from "@/content/director-modes.json";
import promptJson from "@/content/prompt.json";
import engagementsJson from "@/content/engagements.json";
import creditsJson from "@/content/credits.json";
import type {
  About,
  Credit,
  DirectorMode,
  Engagement,
  ProcessStep,
  Project,
  PromptContent,
  Service,
  SiteContent,
  ExperienceEntry,
} from "./types";

export const site = siteJson as SiteContent;
export const projects = projectsJson as Project[];

/** Public portfolio: only approved projects with a playable preview are listed. */
export const portfolioProjects = projects.filter((project) => project.preview);
export const services = servicesJson as Service[];
export const processSteps = processJson as ProcessStep[];
export const about = aboutJson as About;
export const experience = experienceJson as ExperienceEntry[];
export const directorModes = directorModesJson as DirectorMode[];
export const prompt = promptJson as PromptContent;
export const engagements = engagementsJson as Engagement[];
export const credits = creditsJson as Credit[];

export const categories = [
  "All",
  "AI Film",
  "Commercial",
  "Explainer",
  "Documentary",
  "Editing",
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const list = portfolioProjects.length > 0 ? portfolioProjects : projects;
  const index = list.findIndex((project) => project.slug === slug);
  if (index === -1) return list[0];
  return list[(index + 1) % list.length];
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
