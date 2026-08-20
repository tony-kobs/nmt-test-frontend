import type { Metadata } from "next";

export const SITE_NAME = "НМТ математика";
export const SITE_TAGLINE = "Тренажер НМТ-2026 і практика за темами";

export const SITE_DESCRIPTION =
  "Безкоштовна підготовка до НМТ з математики: 10 повних варіантів за схемою УЦОЯО 2026 (22 завдання, 32 бали, рейтинг 100–200), практика за 6 темами у звичайному режимі та Ultimate.";

export const SITE_KEYWORDS = [
  "НМТ",
  "НМТ 2026",
  "математика",
  "підготовка до НМТ",
  "тести з математики",
  "УЦОЯО",
  "ЗНО математика",
  "тренажер НМТ",
  "практика математика",
  "рейтинговий бал",
];

/** Canonical production origin: https://nmt-test-frontend.vercel.app */
export const DEFAULT_SITE_URL = "https://nmt-test-frontend.vercel.app";

/** Prefer NEXT_PUBLIC_SITE_URL; then Vercel URL; then production default. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  return DEFAULT_SITE_URL;
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const isHome = path === "/" || path === "";

  return {
    title: isHome ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "uk_UA",
      type: "website",
      images: [
        {
          url: absoluteUrl("/og.png"),
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl("/og.png")],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
