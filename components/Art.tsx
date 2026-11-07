import RetroCar from './RetroCar';

/**
 * Original, generic vehicle silhouettes (not any specific make or model), lit with a red rim light
 * and a paint-reflection streak. Used wherever a real photograph has not been supplied yet.
 */
export type ArtType = 'retro' | 'super' | 'sedan' | 'suv' | 'truck' | 'van' | 'rv' | 'boat';

const BODY: Record<Exclude<ArtType, 'retro'>, { body: string; glass: string; extra?: string; wheels?: number[] }> = {
  super: {
    body: 'M60 286 C48 262 58 238 96 228 C190 210 262 176 362 134 C402 116 470 106 542 110 C612 116 702 164 782 190 C852 206 930 218 950 240 C962 254 958 274 940 282 Z',
    glass: 'M392 166 C418 134 458 120 522 120 C586 122 642 146 694 176 L392 176 Z',
    extra: 'M300 262 C380 250 520 246 700 258',
    wheels: [236, 792],
  },
  sedan: {
    body: 'M70 288 L70 244 C70 228 86 220 112 216 L232 198 C272 172 332 130 422 120 L602 120 C662 122 722 162 762 190 L880 206 C925 212 945 230 945 254 L945 288 Z',
    glass: 'M304 178 C344 142 392 130 432 128 L592 128 C637 130 687 160 724 188 L304 188 Z M504 128 L504 188',
    extra: 'M110 262 C300 252 640 252 930 262',
    wheels: [250, 782],
  },
  suv: {
    body: 'M70 288 L70 204 C70 184 90 174 120 172 L162 124 C204 92 284 88 404 88 L642 88 C702 90 752 124 792 172 L902 192 C937 198 952 218 952 248 L952 288 Z',
    glass: 'M204 154 C238 110 292 104 404 104 L642 104 C692 106 722 134 762 172 L204 172 Z M476 104 L476 172 M610 104 L610 172',
    extra: 'M250 78 L700 78',
    wheels: [250, 780],
  },
  truck: {
    body: 'M50 288 L50 196 L332 196 L332 134 C342 112 382 98 442 98 L602 98 C652 100 702 142 732 180 L882 198 C932 204 952 222 952 252 L952 288 Z',
    glass: 'M362 144 C382 122 422 114 462 114 L592 114 C632 116 672 150 702 180 L362 180 Z',
    extra: 'M332 196 L332 288 M50 214 L330 214',
    wheels: [200, 790],
  },
  van: {
    body: 'M60 288 L60 92 C60 78 72 72 90 72 L702 72 C762 74 812 124 852 174 L922 194 C947 200 952 218 952 244 L952 288 Z',
    glass: 'M724 92 C768 96 802 134 832 174 L724 174 Z M110 102 L190 102 L190 160 L110 160 Z M230 102 L310 102 L310 160 L230 160 Z M350 102 L430 102 L430 160 L350 160 Z',
    extra: 'M60 222 L930 222',
    wheels: [220, 800],
  },
  rv: {
    body: 'M50 288 L50 82 C50 68 62 62 80 62 L762 62 C782 62 802 72 817 92 L902 192 C942 198 957 216 957 248 L957 288 Z',
    glass: 'M110 102 L230 102 L230 164 L110 164 Z M270 102 L430 102 L430 164 L270 164 Z M480 102 L560 102 L560 230 L480 230 Z M770 94 L830 94 L890 176 L770 176 Z',
    extra: 'M50 214 L940 214',
    wheels: [210, 790],
  },
  boat: {
    body: 'M60 252 L940 228 C884 292 784 304 704 304 L224 304 C144 304 92 282 60 252 Z',
    glass: 'M336 232 L388 162 L644 162 L704 230 Z',
    extra: 'M388 162 L440 124 L560 124 L610 162',
  },
};

export default function CarArt({ type, flip = false, tone = 'a' }: { type: ArtType; flip?: boolean; tone?: 'a' | 'b' | 'c' }) {
  if (type === 'retro') return <RetroCar flip={flip} tone={tone} />;
  const d = BODY[type];
  const id = `${type}-${tone}-${flip ? 'f' : 'n'}`;
  const hue = tone === 'b' ? '#8f1620' : tone === 'c' ? '#3b4a6b' : '#e5303b';
  const isBoat = type === 'boat';
  return (
    <svg
      className="art"
      viewBox="0 0 1000 360"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      focusable="false"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <defs>
        <linearGradient id={`b-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3b41" />
          <stop offset="0.45" stopColor="#17181b" />
          <stop offset="1" stopColor="#060607" />
        </linearGradient>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4b5a78" />
          <stop offset="1" stopColor="#10131a" />
        </linearGradient>
        <linearGradient id={`r-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`w-${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#2a2b30" />
          <stop offset="0.7" stopColor="#8d9097" />
          <stop offset="0.74" stopColor="#1a1b1e" />
          <stop offset="1" stopColor="#0a0a0b" />
        </radialGradient>
        <clipPath id={`c-${id}`}>
          <path d={d.body} />
        </clipPath>
      </defs>

      {/* ground reflection */}
      <ellipse cx="500" cy="332" rx="440" ry="16" fill="#000" opacity="0.55" />
      <g opacity="0.22" transform="translate(0 664) scale(1 -1)">
        <path d={d.body} fill={`url(#b-${id})`} />
      </g>

      {/* body */}
      <path d={d.body} fill={`url(#b-${id})`} />
      <g clipPath={`url(#c-${id})`}>
        <path d="M-40 230 L1100 110 L1100 150 L-40 290 Z" fill={`url(#r-${id})`} opacity="0.35" />
        <path d="M0 300 L1000 300 L1000 360 L0 360 Z" fill={hue} opacity="0.18" />
      </g>
      <g clipPath={`url(#c-${id})`}>
        <path d="M0 150 C300 118 700 118 1000 160 L1000 205 C700 168 300 172 0 210 Z" fill="#fff" opacity="0.07" />
        <path d="M0 232 C300 214 700 214 1000 238 L1000 246 C700 224 300 224 0 242 Z" fill="#fff" opacity="0.14" />
      </g>
      <path d={d.glass} fill={`url(#g-${id})`} opacity="0.92" stroke="#000" strokeOpacity="0.4" />
      {d.extra && <path d={d.extra} fill="none" stroke={hue} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />}
      <path d={d.glass} fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="1" />
      {!isBoat && <ellipse cx="930" cy="238" rx="18" ry="5" fill="#fff" opacity="0.85" />}
      {!isBoat && <ellipse cx="74" cy="236" rx="14" ry="4" fill={hue} opacity="0.9" />}
      <path d={d.body} fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="1.5" />

      {/* wheels */}
      {!isBoat &&
        d.wheels?.map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy={276} r={64} fill="#050506" />
            <circle cx={cx} cy={276} r={54} fill="#0e0e10" stroke="#2c2d31" strokeWidth="2" />
            <circle cx={cx} cy={276} r={36} fill={`url(#w-${id})`} />
            <circle cx={cx} cy={276} r={7} fill={hue} />
            {[0, 72, 144, 216, 288].map((a) => (
              <line
                key={a}
                x1={cx}
                y1={276}
                x2={cx + 34 * Math.cos((a * Math.PI) / 180)}
                y2={276 + 34 * Math.sin((a * Math.PI) / 180)}
                stroke="#0a0a0b"
                strokeWidth="5"
              />
            ))}
          </g>
        ))}
      {isBoat && <path d="M20 310 C120 298 200 322 300 310 S500 298 600 310 S800 322 980 306" fill="none" stroke="#9db4d8" strokeOpacity="0.35" strokeWidth="2" />}
    </svg>
  );
}
