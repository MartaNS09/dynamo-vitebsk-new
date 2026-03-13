export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount?: number;
  color: string;
  icon?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  author?: {
    name: string;
  };
  category?: BlogCategory; // Теперь BlogCategory определен выше
  tags?: string[];
  publishedAt: string;
  readTime?: number;
  views?: number;
  isFeatured?: boolean;
  isPinned?: boolean;
  seo?: {
    metaTitle: string;
    metaDescription: string;
  };
  gallery?: string[];
  published?: boolean;
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  year?: number;
  month?: number;
  page?: number;
  limit?: number;
  search?: string;
  sort?: "newest" | "popular" | "featured";
}

export type BlogPostType = BlogPost;
export type BlogCategoryType = BlogCategory;
