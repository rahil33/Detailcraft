'use client';

import { useId, useState } from 'react';
import Photo from './Photo';

/** Drag / keyboard comparison. The range input carries the interaction so it is fully accessible. */
export default function BeforeAfter({
  before,
  after,
  kind,
  alt,
  beforeCap,
  afterCap,
  ratio = '6 / 1',
}: {
  before: string | null;
  after: string | null;
  kind: 'auto' | 'air';
  alt: string;
  beforeCap?: string;
  afterCap?: string;
  ratio?: string;
}) {
  const [p, setP] = useState(50);
  const id = useId();
  return (
    <figure className="ba">
      <div className="ba-stage" style={{ aspectRatio: ratio, ['--p' as string]: `${p}%` }} data-cursor="Drag">
        <Photo src={after} kind={kind} alt={`${alt} — after`} sizes="(max-width: 900px) 100vw, 60vw" className="ba-img" tone="b" />
        <Photo src={before} kind={kind} alt={`${alt} — before`} sizes="(max-width: 900px) 100vw, 60vw" className="ba-img ba-top" tone="c" />
        <span className="ba-tag ba-tag-b">Before</span>
        <span className="ba-tag ba-tag-a">After</span>
        <i className="ba-bar" aria-hidden="true" />
        <label htmlFor={id} className="sr">
          Compare before and after
        </label>
        <input
          id={id}
          className="ba-range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
        />
      </div>
      {(beforeCap || afterCap) && (
        <figcaption className="ba-cap">
          <span>{beforeCap}</span>
          <span>{afterCap}</span>
        </figcaption>
      )}
    </figure>
  );
}
