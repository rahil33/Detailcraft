# DetailCraft

Next.js (App Router) + GSAP/ScrollTrigger. Routes: `/` (intro + dual-world selector), `/automotive`, `/aviation`.

## Run in VS Code

1. Unzip, then **File → Open Folder…** and choose the `detailcraft` folder (accept the recommended extensions).
2. Open the terminal (**Ctrl+\`**) and run:

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build check
npm run typecheck
```

Node 20.9 or newer is required (`.nvmrc` is included).

## Deploy to Vercel

- **From GitHub:** push the folder to a repo, then on vercel.com choose **Add New → Project**, import the repo and click
  Deploy. Framework (Next.js), build command and output directory are detected automatically; no settings or environment
  variables are needed.
- **From the terminal:** `npm i -g vercel`, then run `vercel` in this folder (and `vercel --prod` to publish).

## Folder map

```
app/            routes (/, /automotive, /aviation), layout, global CSS, favicon
components/     Home (intro + dual-world selector), AutoPage, AirPage, shared UI and animation helpers
lib/            content.ts (all copy and prices), images.ts (photo slots), gsap.ts
public/images/  photos — see slots below
.vscode/        editor settings, debug and build tasks
```

## Photos (drop-in slots)

Put files in `public/images/` named exactly as below (`.avif`, `.webp`, `.jpg`, `.png`). They are picked up at build
time; empty slots render an art-directed placeholder. Landscape ≥ 2400px wide for heroes/showcase; 

| Area | Slots |
|---|---|
| Hero / macro (optional, fall back to the supercar and performance photos) | `auto-hero`, `auto-macro` |
| Vehicle gallery and process showcase (cropped from the supplied reference sheet, background removed, transparent WebP) | `seg-supercars`, `seg-suv`, `seg-performance`, `seg-trucks`, `seg-vans`, `seg-rv`, `seg-boat` |
| Automotive before/after | `auto-before-1` + `auto-after-1` (section appears only when both exist) |
| Aviation (already supplied, from the brochure) | `air-hero`, `air-fleet-jets`, `air-fleet-turboprops`, `air-fleet-pistons`, `air-before`, `air-after` |

The brochure images are low resolution (fleet shots are ~360px); replace them with originals when available.

## Content notes — please verify before launch

- Copy and contact details come from the live site and the aviation brochure. Aviation prices and terms are verbatim;
  nothing was added or changed.
- Only **Full Maintenance** has published inclusions on the live site. Other packages show "inclusions confirmed on
  request". Add their inclusions in `lib/content.ts` (`PACKAGES`).
- FAQ answers 2–4 were not on the live page; they are neutral placeholders in `lib/content.ts` (`FAQ`).
- No client projects, testimonials or portfolio are claimed. Until you add photos, panels show generic original vehicle illustrations (`components/Art.tsx`) that do not depict real vehicles or client work. Add real photos to `public/images/` and they replace the illustrations automatically.
- The inquiry form opens the visitor's email app or WhatsApp addressed to DetailCraft (no backend). Swap in a form
  service in `components/Inquiry.tsx` if you want server-side capture.
- Lenis was deliberately not used: it intercepts the wheel, which conflicts with the "never hijack scrolling" requirement.

## Quotes and contact

Every "Get a quote" button opens a chooser that sends the visitor straight to WhatsApp (+91 80725 82652) or an email to detailcraftchennai@gmail.com, with a pre-filled message. The detailed form at the bottom of each page does the same. No prices are published anywhere on the site.
