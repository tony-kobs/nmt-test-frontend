import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/constants/seo";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/nmt/test"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
