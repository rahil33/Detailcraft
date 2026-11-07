/**
 * A classic 1960s-style grand-touring coupe, drawn as layered vector artwork with studio lighting
 * (metallic paint, chrome, glass reflections, wire wheels). Generic design, not a specific make or model.
 * It is a stand-in until real photography is added to public/images.
 */
export default function RetroCar({ flip = false, tone = 'a' }: { flip?: boolean; tone?: 'a' | 'b' | 'c' }) {
  const id = `rc-${tone}-${flip ? 'f' : 'n'}`;
  const paint =
    tone === 'b'
      ? ['#c9c3b4', '#8f8a7c', '#4a463e']
      : tone === 'c'
        ? ['#6f86b0', '#34486e', '#141d33']
        : ['#c2303a', '#7a121b', '#2a0509'];

  const Wheel = ({ cx }: { cx: number }) => (
    <g>
      <ellipse cx={cx} cy={300} rx={66} ry={66} fill="#050505" />
      <circle cx={cx} cy={300} r={62} fill="#0b0b0c" />
      <circle cx={cx} cy={300} r={52} fill="#e9e6dc" />
      <circle cx={cx} cy={300} r={42} fill="#101010" />
      <circle cx={cx} cy={300} r={36} fill={`url(#${id}-chrome)`} />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * 15 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={cx + 7 * Math.cos(a)}
            y1={300 + 7 * Math.sin(a)}
            x2={cx + 35 * Math.cos(a + 0.35)}
            y2={300 + 35 * Math.sin(a + 0.35)}
            stroke="#2c2c2e"
            strokeWidth="1.4"
          />
        );
      })}
      <circle cx={cx} cy={300} r={9} fill={`url(#${id}-chrome)`} />
      <circle cx={cx} cy={300} r={3.5} fill={paint[0]} />
      <path d={`M${cx - 52} ${300} A52 52 0 0 1 ${cx + 20} ${252}`} stroke="#fff" strokeOpacity="0.25" strokeWidth="2" fill="none" />
    </g>
  );

  return (
    <svg
      className="art art-retro"
      viewBox="0 0 1000 380"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      focusable="false"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={paint[0]} />
          <stop offset="0.38" stopColor={paint[1]} />
          <stop offset="0.72" stopColor={paint[2]} />
          <stop offset="1" stopColor="#050102" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c9d6e6" />
          <stop offset="0.45" stopColor="#5f7390" />
          <stop offset="1" stopColor="#0f1622" />
        </linearGradient>
        <linearGradient id={`${id}-chrome`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#9a9da3" />
          <stop offset="0.6" stopColor="#f2f3f5" />
          <stop offset="1" stopColor="#5a5d63" />
        </linearGradient>
        <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-lamp`} cx="0.4" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#f6efd0" />
          <stop offset="1" stopColor="#8d8461" />
        </radialGradient>
        <radialGradient id={`${id}-floor`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.7" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-clip`}>
          <path d="M70 288 C60 262 72 238 104 232 L196 214 C230 196 262 176 300 156 C346 126 396 112 470 108 C560 104 640 114 700 146 C740 166 770 190 806 202 L896 214 C934 220 954 238 952 266 L950 288 Z" />
        </clipPath>
      </defs>

      {/* ground shadow and reflection */}
      <ellipse cx="500" cy="352" rx="470" ry="22" fill={`url(#${id}-floor)`} />
      <g opacity="0.07" transform="translate(0 700) scale(1 -1)">
        <path d="M70 288 C60 262 72 238 104 232 L196 214 C230 196 262 176 300 156 C346 126 396 112 470 108 C560 104 640 114 700 146 C740 166 770 190 806 202 L896 214 C934 220 954 238 952 266 L950 288 Z" fill={paint[1]} />
      </g>

      {/* rear bumper and front bumper (chrome) */}
      <path d="M52 266 C48 276 52 288 66 292 L112 292 L112 270 Z" fill={`url(#${id}-chrome)`} />
      <path d="M902 276 C940 276 968 280 972 290 C972 298 960 302 944 302 L896 302 Z" fill={`url(#${id}-chrome)`} />

      {/* body */}
      <path
        d="M70 288 C60 262 72 238 104 232 L196 214 C230 196 262 176 300 156 C346 126 396 112 470 108 C560 104 640 114 700 146 C740 166 770 190 806 202 L896 214 C934 220 954 238 952 266 L950 288 Z"
        fill={`url(#${id}-body)`}
      />
      <g clipPath={`url(#${id}-clip)`}>
        {/* shoulder highlight */}
        <path d="M60 232 C300 200 600 196 960 232 L960 246 C600 214 300 218 60 250 Z" fill={`url(#${id}-gloss)`} opacity="0.85" />
        {/* lower sill shadow */}
        <path d="M60 268 L960 268 L960 300 L60 300 Z" fill="#000" opacity="0.4" />
        {/* wheel arches */}
        <circle cx="232" cy="300" r="74" fill="#050505" />
        <circle cx="782" cy="300" r="74" fill="#050505" />
        {/* chrome side strip */}
        <path d="M96 246 C330 232 620 232 930 250" stroke={`url(#${id}-chrome)`} strokeWidth="3" fill="none" />
      </g>

      {/* greenhouse */}
      <path
        d="M318 164 C352 136 398 124 468 120 C556 117 628 125 676 152 C700 166 722 182 740 196 L322 196 Z"
        fill="#0b0d12"
      />
      <path d="M332 192 C358 150 396 134 454 130 L454 192 Z" fill={`url(#${id}-glass)`} />
      <path d="M470 130 C540 128 600 134 646 156 C676 170 696 182 712 192 L470 192 Z" fill={`url(#${id}-glass)`} />
      <path d="M352 188 L430 140" stroke="#fff" strokeOpacity="0.45" strokeWidth="6" strokeLinecap="round" />
      <path d="M498 150 L580 150" stroke="#fff" strokeOpacity="0.3" strokeWidth="5" strokeLinecap="round" />
      <path d="M326 196 C340 160 372 140 410 130" stroke={`url(#${id}-chrome)`} strokeWidth="2.5" fill="none" />
      <path d="M322 197 L740 197" stroke={`url(#${id}-chrome)`} strokeWidth="2.5" />
      {/* B-pillar */}
      <rect x="454" y="128" width="16" height="68" fill={paint[2]} />

      {/* door line and handle */}
      <path d="M470 197 L466 276" stroke="#000" strokeOpacity="0.55" strokeWidth="1.6" />
      <path d="M330 202 L336 276" stroke="#000" strokeOpacity="0.4" strokeWidth="1.4" />
      <rect x="428" y="214" width="26" height="6" rx="3" fill={`url(#${id}-chrome)`} />

      {/* headlamp, grille, tail lamp */}
      <circle cx="912" cy="236" r="19" fill={`url(#${id}-chrome)`} />
      <circle cx="912" cy="236" r="14" fill={`url(#${id}-lamp)`} />
      <path d="M938 250 L958 252 L958 276 L934 274 Z" fill="#0b0b0b" stroke={`url(#${id}-chrome)`} strokeWidth="2" />
      <path d="M940 258 L956 259 M939 264 L956 265 M938 270 L956 271" stroke="#9a9da3" strokeWidth="1" />
      <rect x="64" y="236" width="14" height="22" rx="4" fill="#ff3b3b" opacity="0.9" />

      {/* wheels */}
      <Wheel cx={232} />
      <Wheel cx={782} />

      {/* rim light on roof and shoulders */}
      <path d="M300 156 C346 126 396 112 470 108 C560 104 640 114 700 146" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.6" fill="none" />
    </svg>
  );
}
