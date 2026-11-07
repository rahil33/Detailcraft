import Image from 'next/image';
import CarArt, { type ArtType } from './Art';

type Props = {
  src: string | null;
  alt?: string;
  kind?: 'auto' | 'air';
  slot?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** adds data-parallax on the inner layer (amount in percent) */
  par?: number;
  /** use an alternate placeholder tone */
  tone?: 'a' | 'b' | 'c';
  /** original illustration shown until a real photo exists */
  art?: ArtType;
  flip?: boolean;
  /** where the illustration sits inside the frame */
  place?: 'center' | 'right' | 'low';
};

/**
 * Renders a real photo when the slot has one, otherwise an art-directed placeholder
 * (graphite + red light for automotive, sky + cloud for aviation).
 */
export default function Photo({
  src,
  alt = '',
  kind = 'auto',
  slot,
  className = '',
  priority = false,
  sizes = '100vw',
  par,
  tone = 'a',
  art,
  flip = false,
  place = 'center',
}: Props) {
  return (
    <div className={`photo photo-${kind} ${className}`}>
      <div className="photo-in" data-parallax={par}>
        {src ? (
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} quality={95} className="photo-img" />
        ) : (
          <div className={`ph ph-${kind} ph-${tone}`} aria-hidden="true">
            <i className="ph-glow" />
            <i className="ph-streak" />
            <i className="ph-floor" />
            {art ? (
              <span className={`ph-art ph-art-${place}`} data-slot={slot}>
                <CarArt type={art} flip={flip} tone={tone} />
              </span>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
