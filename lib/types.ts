export type Social = {
  label: string;
  handle: string;
  href: string;
};

export type ToolGroup = {
  label: string;
  items: string[];
};

export type SiteContent = {
  name: string;
  role: string;
  tagline: string;
  description: string;
  location: string;
  locationShort: string;
  timezone: string;
  availability: { status: string; note: string; available: boolean };
  email: string;
  socials: Social[];
  showreel: {
    title: string;
    duration: string;
    poster: string;
    src: string;
    tagline: string;
    note: string;
  };
  stats: { value: string; label: string }[];
  toolGroups: ToolGroup[];
  analytics: { gaId: string };
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: "AI Film" | "Commercial" | "Editing" | "Storytelling" | "Explainer" | "Documentary";
  tags: string[];
  year: string;
  location: string;
  role: string;
  description: string;
  thumbnail: string;
  flat: string;
  preview?: string;
  accent: string;
  featured: boolean;
  overview: string;
  challenge: string;
  approach: string;
  pillars: { title: string; body: string }[];
  process: { step: string; body: string }[];
  beforeAfter: { image: string; flat: string; note: string };
  gallery: { src: string; caption: string }[];
  credits: string[];
};

export type Service = {
  id: string;
  title: string;
  summary: string;
  body: string;
  deliverables: string[];
  useCases: string[];
};

export type ProcessStep = {
  number: string;
  title: string;
  duration: string;
  body: string;
};

export type About = {
  headline: string;
  portrait: string;
  portraitAlt: string;
  profile: string;
  story: string[];
  philosophy: string;
  expertise: string[];
  credentials: { label: string; value: string }[];
};

export type ExperienceEntry = {
  organization: string;
  role: string;
  meta: string;
  description: string;
};

export type DirectorMode = {
  title: string;
  body: string;
  deliverables: string;
};

export type PromptContent = {
  headline: string;
  intro: string;
  process: string;
  exampleLabel: string;
  example: string;
  deliverables: string[];
};

export type Engagement = {
  name: string;
  label: string;
  description: string;
  includes: string[];
  detail: string;
  cta: string;
};

export type Credit = {
  slot: string;
  title: string;
  creator: string;
  license: string;
  licenseUrl: string;
  source: string;
  href: string;
};
