"use client";

import { BlogPost } from "@/types/blog.types";
import { usePathname } from "next/navigation";

interface BlogStructuredDataProps {
  post: BlogPost;
}

export default function BlogStructuredData({ post }: BlogStructuredDataProps) {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${baseUrl}${pathname}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${baseUrl}${post.featuredImage.url}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      ...(post.author.position && { jobTitle: post.author.position }),
    },
    publisher: {
      "@type": "Organization",
      name: "СДЮШОР Динамо Витебск",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo-dynamo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    wordCount: post.content.length,
    timeRequired: `PT${post.readTime}M`,
    articleSection: post.category.name,
    keywords: post.tags.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
