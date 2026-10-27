/**
 * All site copy lives here. Sources:
 *  - LIVE   = the existing site (detailcraft-kady.vercel.app) as audited
 *  - BROCH  = the supplied DetailCraft aviation brochure (terms verbatim; pricing intentionally not published, quotes on request)
 *  - REF    = the supplied poster reference sheet (figures are indicative, manufacturer-claimed)
 */

export const CONTACT = {
  phone: '+91 80725 82652',
  phoneHref: 'tel:+918072582652',
  whatsapp: 'https://wa.me/918072582652',
  email: 'detailcraftchennai@gmail.com',
  city: 'Chennai, India',
};

export const TAGLINE = 'Preservation · Protection · Presentation'; // BROCH

export const VISION =
  "To become India's most trusted premium aircraft and automotive detailing company. We aim to set the benchmark for luxury aesthetics, combining flawless precision with executive-level service to redefine how assets are maintained and showcased."; // LIVE

export const MISSION =
  'To deliver premium solutions with the highest hygiene and luxury standards. We are dedicated to providing fast turnaround support, preserving the aesthetics and long-term value of your assets, and building enduring partnerships through professionalism.'; // LIVE

/* ───────────── AUTOMOTIVE ───────────── */

export type ArtKind = 'retro' | 'super' | 'sedan' | 'suv' | 'truck' | 'van' | 'rv' | 'boat';

export type Vehicle = {
  id: string;
  art: ArtKind;
  flip?: boolean;
  slot: string;
  maker: string;
  name: string;
  specs: [string, string][];
};

// Pinned showcase: the DetailCraft process, one stage per slide. Illustrations are generic, not client vehicles.
export const SHOWCASE: Vehicle[] = [
  {
    id: 'exterior',
    art: 'retro',
    slot: 'seg-supercars',
    maker: 'Stage 01',
    name: 'Exterior',
    specs: [
      ['Wash', 'Quick hand wash'],
      ['Finish', 'Wax and buff'],
      ['Wheels', 'Rims and tyres'],
    ],
  },
  {
    id: 'interior',
    art: 'sedan',
    flip: true,
    slot: 'seg-suv',
    maker: 'Stage 02',
    name: 'Interior',
    specs: [
      ['Cabin', 'Vacuum and wipe-down'],
      ['Detail', 'Windows, mirrors, jambs'],
      ['Deep', 'Shampoo and remediation'],
    ],
  },
  {
    id: 'correction',
    art: 'retro',
    slot: 'seg-performance',
    maker: 'Stage 03',
    name: 'Correction',
    specs: [
      ['Goal', 'Refine the surface'],
      ['Before', 'Protection is applied'],
      ['Time', 'May be kept overnight'],
    ],
  },
  {
    id: 'coating',
    art: 'suv',
    slot: 'seg-trucks',
    maker: 'Stage 04',
    name: 'Ceramic',
    specs: [
      ['Layer', 'Durable and protective'],
      ['Applied to', 'Cured paint'],
      ['Option', 'Exterior-only or full detail'],
    ],
  },
  {
    id: 'care',
    art: 'van',
    slot: 'seg-vans',
    maker: 'Stage 05',
    name: 'Maintain',
    specs: [
      ['Programmes', 'Full Maintenance'],
      ['Tiers', 'Gold Premium'],
      ['Top tier', 'Masterpiece Detail'],
    ],
  },
];

export type Segment = { id: string; slot: string; title: string; sub: string; span: string; art: ArtKind };

export const SEGMENTS: Segment[] = [
  { id: 'supercars', slot: 'seg-supercars', title: 'Supercars', sub: 'Exotic and high-performance', span: 'a', art: 'retro' },
  { id: 'suv', slot: 'seg-suv', title: 'SUVs', sub: 'Family and executive', span: 'b', art: 'suv' },
  { id: 'performance', slot: 'seg-performance', title: 'Performance', sub: 'Sports and performance', span: 'c', art: 'super' },
  { id: 'trucks', slot: 'seg-trucks', title: 'Trucks', sub: 'Pickups and utility', span: 'd', art: 'truck' },
  { id: 'vans', slot: 'seg-vans', title: 'Sprinter vans', sub: 'Sprinter and fleet vans', span: 'e', art: 'van' },
  { id: 'rv', slot: 'seg-rv', title: 'RVs', sub: 'On enquiry', span: 'f', art: 'rv' },
  { id: 'boat', slot: 'seg-boat', title: 'Boats', sub: 'On enquiry', span: 'g', art: 'boat' },
];

export const AUTO_SERVICES = [
  {
    name: 'Exterior detailing',
    text: 'From a maintenance refresh to a full finish restoration, every exterior is cleaned, refined and protected by hand.',
    items: [
      ['Multi-step wash', 'Pressure wash, wheel and tyre degreasing, underbody lance cleaning and a pH-neutral foam bath.'],
      ['Decontamination', 'Clay bar or chemical solvents lift embedded iron particles, tar, tree sap and road grime.'],
      ['Paint correction & polishing', 'Machine polishing removes fine swirl marks, light scratches and oxidation.'],
      ['Protection', 'Wax, sealants, ceramic or graphene coatings lock in gloss and shield against UV rays and humidity.'],
      ['Trim & glass care', 'Bumper restoration, window polishing and tyre dressing.'],
    ] as (string | [string, string])[],
  },
  {
    name: 'Interior detailing',
    text: 'The cabin cleaned surface by surface, from a light maintenance clean through to deep shampoo and remediation.',
    items: ['Interior vacuum', 'Wipe all surfaces', 'Minor stains', 'Windows & mirrors', 'Door jambs', 'Floor mats', 'Detail trunk', 'Deep shampoo', 'Remediation'],
  },
  {
    name: 'Ceramic coating',
    text: 'A durable protective layer for cured paint, applied as an exterior-only service or alongside a full detail.',
    items: ['Hydrophobic, easier-to-clean surface', 'Exterior-only or with a full detail', 'Care and maintenance advice'],
  },
  {
    name: 'PPF & paint correction',
    text: 'Correction refines the surface before it is protected, and paint protection is planned around how the vehicle is driven and stored. Depending on condition, the vehicle may be kept overnight.',
    items: ['Extensive paint correction', 'Surface refined before protection', 'Paint protection film (PPF)', 'Planned around use and storage'],
  },
];

export type Pkg = { group: string; name: string; includes?: { exterior: string[]; interior: string[] } };

export const PACKAGES: Pkg[] = [
  {
    group: 'Full Detail',
    name: 'Full Maintenance',
    includes: {
      exterior: ['Refresh', 'Quick hand wash', 'Wax protection', 'Clean rims', 'Clean tires'],
      interior: [
        'Interior vacuum',
        'Wipe all surfaces',
        'Minor stains',
        'Windows & mirrors',
        'Door jambs',
        'Floor mats',
        'Detail trunk',
      ],
    },
  }, // LIVE
  { group: 'Full Detail', name: 'Gold Premium' },
  { group: 'Full Detail', name: 'Masterpiece Detail' },
  { group: 'Exterior Only', name: 'Maintenance' },
  { group: 'Exterior Only', name: 'Wax & Buff' },
  { group: 'Exterior Only', name: 'Ceramic Coating' },
  { group: 'Interior Only', name: 'Maintenance' },
  { group: 'Interior Only', name: 'Deep Shampoo' },
  { group: 'Interior Only', name: 'Remediation' },
];

export const FAQ = [
  {
    q: 'How long does a detailing service take?',
    a: 'Depending on the package and the condition of the vehicle or aircraft, our services typically range from 2 to 6 hours. Ceramic coatings and extensive paint correction may require keeping the asset overnight.', // LIVE
  },
  {
    q: 'Do I need to drop off my vehicle or do you come to me?',
    a: 'Tell us the vehicle and where it is based when you request a quote, and we will confirm the options available for your booking.',
  },
  {
    q: 'What is a ceramic coating?',
    a: 'A protective layer applied to cured paint that adds a hydrophobic, easier-to-clean surface. We will advise whether it suits your vehicle and how it should be maintained.',
  },
  {
    q: 'How often should I get my vehicle or aircraft detailed?',
    a: 'It depends on use, storage and the protection already applied. We recommend a maintenance schedule after assessing the asset.',
  },
];

/* ───────────── WHY (BROCH) ───────────── */

export const WHY = [
  { t: 'Precision', d: 'Technical, multi-stage processes with OEM-compliant, non-corrosive products.' },
  { t: 'Trained specialists', d: 'Technicians trained for sensitive surfaces and executive interiors.' },
  { t: 'Asset preservation', d: 'Protection that preserves value, presentation and long-term finish.' },
  { t: 'Confidentiality', d: 'Discreet, professional service with strict adherence to client privacy.' },
  { t: 'Turnaround support', d: 'Rapid mobilisation designed around your schedule, including last-minute and overnight service.' },
];

/* ───────────── AVIATION (BROCH, verbatim where quoted) ───────────── */

export const AIR = {
  intro:
    'At DetailCraft, we specialize in aircraft appearance management, premium detailing and protection services that preserve value, enhance presentation, and support operational excellence across business aviation and luxury vehicle fleets.',
  tag: 'Specialized aircraft detailing, meticulous cabin care, and aerospace-certified protective coatings tailored for private owners, charter operators, and flight departments.',
  overviewTitle: 'Engineering impeccable aircraft presentation',
  overview:
    'At DetailCraft, we provide dedicated aircraft appearance management for business aviation and executive fleets. Detailing an aircraft requires technical precision: we use strictly aviation-certified, non-corrosive chemicals and OEM-compliant procedures that preserve sensitive composite structures, windows, and high-gloss liveries while honoring tight turnaround schedules.',
  philosophy:
    'Protecting aeronautical surfaces and cabin materials with meticulous standards that safeguard both long-term asset value and brand prestige.',
  pillars: [
    { t: 'Aviation-approved products', d: 'Every chemical, compound and sealant meets strict aerospace safety specifications for composite and alloy care.' },
    { t: 'Trained specialists', d: 'Technicians trained in static ports, pitot tubes, de-ice boots, and sensitive executive interior detailing.' },
    { t: 'Fast turnaround support', d: 'Rapid mobilization designed around charter flight plans, including prompt last-minute and overnight service.' },
    { t: 'Appearance programs', d: 'Scheduled, recurring programs that minimize surface degradation and ensure mission readiness.' },
    { t: 'Fleet care solutions', d: 'Centralized billing, standardized SOPs, and cross-fleet consistency across multi-aircraft operations.' },
    { t: 'Discreet & secure', d: 'Uncompromising confidentiality, airside access compliance, and strict adherence to client privacy protocols.' },
  ],
  exterior: [
    ['Wet & Dry Wash', 'removes bugs, soot, and ramp film.'],
    ['Paint Sealant & Wax', 'synthetic barrier against UV.'],
    ['Leading Edge Polish', 'removes oxidation and water spots.'],
    ['De-Ice Boot Care', 'pH-neutral cleaning and conditioning.'],
    ['Gear & Undercarriage', 'removes brake dust and grime.'],
  ],
  interior: [
    ['Deep Cabin Vacuuming', 'seat rails and overhead bins.'],
    ['Leather Care', 'pH-neutral cleaning and conditioning.'],
    ['Carpet & Upholstery', 'fiber-safe deep extraction.'],
    ['Wood & Brightwork', 'microfiber polishing.'],
    ['Galley & Lavatory', 'food-safe sanitization.'],
  ],
  serviceSections: [
    {
      id: 'exterior',
      title: 'Exterior detailing',
      short: 'Wash, polish and protect the airframe',
      intro:
        'A wash chosen for the condition of your aircraft, wet or dry, followed by polishing of leading edges and brightwork and a protective sealant that guards the finish against sun and weather.',
      for: 'scheduled upkeep, pre-delivery presentation and charter aircraft that need to look right on the ramp.',
      items: [
        ['Wet or dry wash', 'matched to the aircraft and the conditions on the ramp.'],
        ['Paint sealant & wax', 'a synthetic barrier against UV.'],
        ['Leading edge polish', 'removes oxidation and water spots.'],
        ['De-ice boot care', 'pH-neutral cleaning and conditioning.'],
        ['Gear & undercarriage', 'removes brake dust and grime.'],
      ],
    },
    {
      id: 'interior',
      title: 'Interior detailing',
      short: 'Deep clean and sanitise the cabin',
      intro:
        'A careful clean of seats, carpets and the surfaces passengers touch most, using aviation-approved products. Sanitising keeps the cabin fresh, and recurring care programmes keep it that way between trips.',
      for: 'executive cabins, charter fleets and owners who want the interior to feel new on every flight.',
      items: [
        ['Deep cabin vacuuming', 'seat rails and overhead bins.'],
        ['Leather care', 'pH-neutral cleaning and conditioning.'],
        ['Carpet & upholstery', 'fibre-safe deep extraction.'],
        ['Wood & brightwork', 'microfibre polishing.'],
        ['Galley & lavatory', 'food-safe sanitisation.'],
      ],
    },
    {
      id: 'quick-turn',
      title: 'Quick turn',
      short: 'A fast refresh between flights',
      intro:
        'A focused refresh for short ground stays (under two hours). We concentrate on the most visible areas, the nose, leading edges and windshields, then reset the cabin so the aircraft leaves looking its best.',
      for: 'charter and corporate operators with tight turnarounds, including last-minute and overnight requests.',
      items: [
        ['Nose, leading edges & windshields', 'bugs, oil and surface film removed.'],
        ['Cabin waste removal', 'rapid trash and waste handling.'],
        ['Floors', 'seat, aisle and cockpit floor vacuuming.'],
        ['Cabin reset', 'seat belt cross-fold and pillow reset.'],
        ['Galley & lavatory', 'wipe-down, sanitisation and mirror polish.'],
        ['Departure walk-through', 'a final check before release.'],
      ],
    },
  ],
  services: [
    'Aircraft Cleaning',
    'Cabin Detailing',
    'Surface Protection',
    'Helicopter Detailing',
    'Ceramic Coating',
    'Exterior Detailing',
    'Rapid Turnaround Support',
    'Training Aircraft Detailing',
  ],
  fleets: [
    { slot: 'air-fleet-jets', t: 'Business jets', d: 'Light, midsize, and long-range jets (Phenom, Citation, Challenger).' },
    { slot: 'air-fleet-turboprops', t: 'Turboprops', d: 'King Air, Pilatus PC-12, and TBM series utility and corporate aircraft.' },
    { slot: 'air-fleet-pistons', t: 'Pistons & rotors', d: 'Cirrus SR22, Cessna, Beechcraft, and executive turbine helicopters.' },
  ],
  process: [
    ['Request', 'Submit inquiry via phone, email, or direct dispatch.'],
    ['Assess', 'Audit aircraft type, paint condition, and schedule.'],
    ['Scope', 'Clear quotation based on exact work requirements.'],
    ['Execute', 'Trained crews perform airside service on schedule.'],
    ['Handover', 'Quality checklist sign-off and departure release.'],
  ],
  correctionTitle: 'Specialized paint revitalization & restoration',
  correction:
    'Prolonged exposure to UV radiation, atmospheric contaminants, and de-icing fluids dulls paint surfaces and oxidizes polished brightwork. DetailCraft performs technical multi-stage paint restoration and aerospace ceramic coatings that seal porous paint, reduce drag, and preserve original livery shine.',
  beforeCap: 'Weathered paint with embedded exhaust soot & oxidized clearcoat.',
  afterCap: 'Fully revived gloss, sealed against environmental erosion.',
  restorations: [
    ['Aerospace ceramic coatings', 'Extreme hydrophobic barrier resisting jet blast, oil residue, and UV oxidation. Enhances gloss depth between scheduled wash-downs.'],
    ['Window polishing & clarity', 'Specialized micro-abrasive polishing for cabin and cockpit transparencies, removing haze.'],
    ['Leather restoration & re-dye', 'Precision recoloring, scuff repair, and hydration treatments that restore softness and appearance.'],
    ['Disinfection & sanitation', 'Hospital-grade antimicrobial misting disinfection complying with international port-of-entry health requirements.'],
  ],
  ramp: {
    title: 'Local VOMM support partner for visiting operators',
    base: 'Permanently based at VOMM · Chennai Airport',
    left: ['Rapid on-ground deployment, zero positioning delays', 'Flight tracking ensures our team is ready before arrival'],
    right: ['OEM-compliant, non-corrosive products', 'Fast, discreet, schedule-driven execution'],
    badge: '24/7 Ramp Support',
    quick: {
      t: 'Quick turnaround',
      s: 'Short ground stays (under 2 hours)',
      items: [
        'Rapid cabin trash removal and waste handling',
        'Seat, aisle, and cockpit floor vacuuming',
        'Seat belt cross-fold and pillow reset',
        'Galley wipe-down and sanitization',
        'Lavatory refresh, mirror polishing',
        'Final departure walk-through',
      ],
    },
    ron: {
      t: 'Overnight deep care (RON)',
      s: 'Comprehensive detailing while parked overnight',
      items: [
        'Full leather deep cleanse and conditioning',
        'Hot-water extraction on all carpet',
        'Wood veneer cleaning and buffing',
        'Cockpit gauge and windshield cleaning',
        'Ozone or enzyme odor elimination',
        'Multi-point cabin quality inspection',
      ],
    },
    commitment:
      'Every aircraft is serviced with strict confidentiality, FOD prevention protocol, and zero-compromise attention to schedule. We coordinate seamlessly with your ground handlers and FBO so your aircraft departs immaculately on time.',
  },
  categories: [
    ['Light Jets', 'Citation CJ3, Phenom 100/300, HondaJet'],
    ['Midsize Jets', 'Hawker 800/900, Citation XLS, Learjet 60'],
    ['Turboprops', 'King Air B200/350, TBM 900, Pilatus PC-12'],
    ['Pistons & Rotors', 'Cessna 172/206, Cirrus SR22, Bonanza, R66'],
  ],

  addons: [
    'Aerospace Ceramic Coating',
    'Leather Dye & Restoration',
    'Odor Elimination Treatment',
    'Brightwork Metal Compounding',
    'De-Ice Boot Refurbishment',
    'Port Disinfection Sanitization',
  ],
  helicopter: {
    t: 'Helicopter detailing · Pan-India',
    s: 'Appearance care for executive, charter and utility helicopters, wherever they are based.',
    items: ['Exterior wash and airframe care', 'Windscreen and canopy polishing', 'Cabin and interior detailing', 'Protective coatings for paint and brightwork'],
  },
  training: {
    t: 'Training aircraft detailing · Pan-India',
    s: 'Reliable, schedule-friendly detailing for flight schools, flying clubs and training fleets.',
    items: ['Scheduled exterior wash programmes', 'Cockpit and cabin cleaning', 'Windshield clarity restoration', 'Quick turnaround between training sorties'],
  },
  terms: [
    'We recommend scheduling in advance to guarantee ramp slot clearance and crew allocation.',
    'Payment is due upon completion. We accept cash, UPI, credit cards, and direct bank transfers.',
    'Cancellation: for out-of-city charter operators, no charge applies if canceled at least 2 hours prior to ETA.',
    'Exit clause: fleet agreements require 30-day or 60-day written notice by either party to terminate without cause.',
  ],
};

export const INQUIRY_OPTIONS = [
  'Automotive — Full Detail',
  'Automotive — Exterior only',
  'Automotive — Interior only',
  'Automotive — Ceramic coating / protection',
  'Aviation — Aircraft appearance management',
  'Aviation — Helicopter / training aircraft',
  'Aviation — Fleet programme',
  'Something else',
];
