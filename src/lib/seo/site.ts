export const SITE_NAME = "СДЮШОР Динамо Витебск";
export const SITE_DOMAIN = "dynamovitebsk.by";

export const getSiteUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;

  if (!envUrl) {
    return `https://${SITE_DOMAIN}`;
  }

  return envUrl.replace(/\/+$/, "");
};

export const toAbsoluteUrl = (path: string): string => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
};
