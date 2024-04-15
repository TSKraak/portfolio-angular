export interface AboutData {
  id?: number;
  about: string;
  portrait: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectData {
  id?: number;
  project: string;
  image: string;
  company: string;
  description: string;
  url: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExperienceData {
  id?: number;
  title: string;
  logo: string;
  company: string;
  period: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}
