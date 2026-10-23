import { notFound } from "next/navigation";

/**
 * Case studies kept off the site until they're needed. Remove a slug to
 * publish it: its card returns to the home grid and the page goes live.
 */
export const HIDDEN_CASE_STUDIES: readonly string[] = [
  "quorkboard-financial",
  "quorkboard-resourcing",
  "fga",
  "ubs-client-discovery",
];

export function isHidden(href: string) {
  return HIDDEN_CASE_STUDIES.some((slug) => href === `/projects/${slug}`);
}

/** Hidden pages 404 in production but still open under `next dev` for previewing. */
export function guardHidden(slug: string) {
  if (process.env.NODE_ENV === "production" && HIDDEN_CASE_STUDIES.includes(slug)) {
    notFound();
  }
}
