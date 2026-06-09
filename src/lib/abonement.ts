/** API may return comma-separated string or string[] depending on how data was saved. */
export function normalizeAbonementFeatures(features: unknown): string[] {
  if (Array.isArray(features)) {
    return features
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof features === "string" && features.trim()) {
    return features
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}
