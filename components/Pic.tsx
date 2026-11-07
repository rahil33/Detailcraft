'use client';
import { useState } from 'react';

/** Free Unsplash photo with a local fallback if the remote image can't load. */
export const U = (id: string, w = 1400) => `https://unsplash.com/photos/${id}/download?force=true&w=${w}`;

export default function Pic({ src, fallback, alt, className = '' }: { src: string; fallback: string; alt: string; className?: string }) {
  const [s, setS] = useState(src);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={s} alt={alt} loading="lazy" className={`pic ${className}`} onError={() => s !== fallback && setS(fallback)} />;
}
