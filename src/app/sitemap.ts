import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";
import { ALL_DEPARTMENTS } from "@/data/departments";
import { ALL_SECTIONS } from "@/data/sport-sections";
import { getSiteUrl } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes = [
    "",
    "/sports",
    "/departments",
    "/blog",
    "/trainers",
    "/history",
    "/administration",
    "/enrollment",
    "/rental",
    "/privacy",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const sportRoutes = ALL_SECTIONS.map((section) => ({
    url: `${siteUrl}/sports/${section.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const departmentRoutes = ALL_DEPARTMENTS.map((department) => ({
    url: `${siteUrl}/departments/${department.seoSlug.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...sportRoutes, ...departmentRoutes, ...blogRoutes];
}
