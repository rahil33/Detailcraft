import type { MetadataRoute } from 'next';
const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://detailcraft-kady.vercel.app';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/automotive', '/aviation'].map((p) => ({ url: `${base}${p}`, lastModified: new Date() }));
}
