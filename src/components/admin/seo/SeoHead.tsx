import React from "react";
import Head from "next/head";

interface SeoHeadProps {
  seo?: {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
    robots?: string;
    canonical?: string;
  } | null;
  defaultTitle?: string;
  defaultDescription?: string;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  seo,
  defaultTitle = "СДЮШОР Динамо Витебск",
  defaultDescription = "Спортивная школа олимпийского резерва",
}) => {
  const title = seo?.title || defaultTitle;
  const description = seo?.description || defaultDescription;
  const robots = seo?.robots || "index, follow";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {seo?.keywords && <meta name="keywords" content={seo.keywords} />}
      <meta name="robots" content={robots} />

      {/* Open Graph */}
      <meta property="og:title" content={seo?.ogTitle || title} />
      <meta
        property="og:description"
        content={seo?.ogDescription || description}
      />
      {seo?.ogImage && <meta property="og:image" content={seo.ogImage} />}
      <meta property="og:type" content="website" />

      {/* Canonical */}
      {seo?.canonical && <link rel="canonical" href={seo.canonical} />}
    </Head>
  );
};
