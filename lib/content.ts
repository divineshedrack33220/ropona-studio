import siteJson from "@/content/site.json";
import projectsJson from "@/content/projects.json";
import servicesJson from "@/content/services.json";
import processJson from "@/content/process.json";
import aboutJson from "@/content/about.json";
import testimonialsJson from "@/content/testimonials.json";
import pricingJson from "@/content/pricing.json";
import creditsJson from "@/content/credits.json";
import type {
  About,
  Credit,
  PricingModel,
  ProcessStep,
  Project,
  Service,
  SiteContent,
  Testimonial,
} from "./types";

export const site = siteJson as SiteContent;
export const projects = projectsJson as Project[];

/**
 * The public portfolio. Only projects with a playable film preview are listed;
 * the rest stay available by direct URL as archive work.
 */
export const portfolioProjects = projects.filter((project) => project.preview);
export const services = servicesJson as Service[];
export const processSteps = processJson as ProcessStep[];
export const about = aboutJson as About;
export const testimonials = testimonialsJson as Testimonial[];
export const pricing = pricingJson as PricingModel[];
export const credits = creditsJson as Credit[];

export const categories = [
  "All",
  "AI Film",
  "Commercial",
  "Editing",
  "Storytelling",
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
