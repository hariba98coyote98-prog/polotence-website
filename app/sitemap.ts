import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://polotence.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/checkout`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/legal/oferta`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE}/legal/privacy`, lastModified, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE}/legal/delivery`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/legal/return`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
}
