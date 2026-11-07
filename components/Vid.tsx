'use client';
import { useEffect, useRef, useState } from 'react';

/** Muted, looping background video. Shows the poster image for reduced motion or if playback fails. */
export default function Vid({ src, poster, className = '', label = '' }: { src: string; poster: string; className?: string; label?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setStill(true); return; }
    const v = ref.current;
    if (!v) return;
    v.play().catch(() => setStill(true));
    // pause when off screen to save battery
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.05 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  if (still) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt={label} className={`vid ${className}`} />;
  }
  return (
    <video ref={ref} className={`vid ${className}`} src={src} poster={poster} muted loop playsInline autoPlay preload="auto" aria-label={label || undefined} aria-hidden={label ? undefined : true} />
  );
}
