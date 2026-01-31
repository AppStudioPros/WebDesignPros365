// Type definitions

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  content?: string;
  mainImage?: string;
  publishedAt: string;
  readTime: string;
  category: string;
  featured?: boolean;
}

export interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  fullDescription: string;
  features: string[];
  deliverables: string[];
  timeline: string;
  icon: string;
  isFlagship?: boolean;
  color: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}
