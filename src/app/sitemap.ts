import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/constants/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/nmt`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/practice`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/nmt/formulas`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/nmt/results`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
}
