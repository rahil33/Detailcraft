import fs from 'node:fs';
import path from 'node:path';

/**
 * Photo slots. Drop a file named `<slot>.(avif|webp|jpg|jpeg|png)` into
 * /public/images and it is picked up at build time — no code changes.
 * Slots without a file render an art-directed placeholder instead.
 */
export const SLOTS = [
  // Automotive
  'auto-hero',
  'auto-macro',
  'seg-supercars',
  'seg-suv',
  'seg-performance',
  'seg-trucks',
  'seg-vans',
  'seg-rv',
  'seg-boat',
  'auto-before-1',
  'auto-after-1',
  // Aviation (extracted from the DetailCraft brochure)
  'air-hero',
  'air-fleet-jets',
  'air-fleet-turboprops',
  'air-fleet-pistons',
  'air-before',
  'air-after',
  'air-helicopter',
  'air-training',
] as const;

export type Slot = (typeof SLOTS)[number];
export type Images = Record<Slot, string | null>;

const EXTS = ['avif', 'webp', 'jpg', 'jpeg', 'png'];

export function getImages(): Images {
  const dir = path.join(process.cwd(), 'public', 'images');
  const out = {} as Images;
  for (const slot of SLOTS) {
    out[slot] = null;
    for (const ext of EXTS) {
      if (fs.existsSync(path.join(dir, `${slot}.${ext}`))) {
        out[slot] = `/images/${slot}.${ext}`;
        break;
      }
    }
  }
  return out;
}
