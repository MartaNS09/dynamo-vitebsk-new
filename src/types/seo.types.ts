export interface SeoData {
  id: string;
  page: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  robots?: string;
  canonical?: string;
  isActive: boolean;
  updatedAt: string;
  updatedBy: string;
}

export interface SeoFormData {
  page: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  robots?: string;
  canonical?: string;
  isActive: boolean;
}

export interface SeoPage {
  id: string;
  name: string;
  path: string;
  group: "main" | "sections" | "blog" | "info" | "system";
}

export interface SeoValidationErrors {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}
