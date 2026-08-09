# NorthStar Electric & Solar

A premium, fully responsive marketing site for an electrical and solar contracting
business, built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**,
**Framer Motion** and **Lucide React**.

The design is an original synthesis — it borrows structural ideas that work well on
comparable electrical/solar sites (mega-menu navigation, credential marquees, case
studies with hard numbers, quote calculators, accordion FAQs) and rebuilds them around
a tighter design system, better typography and stronger accessibility.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Dev server                                          |
| `npm run build`     | Production build (type-checks as part of the build) |
| `npm run start`     | Serve the production build                          |
| `npm run lint`      | ESLint (`eslint-config-next` + React Hooks rules)   |
| `npm run typecheck` | `tsc --noEmit`                                      |
| `npm run images`    | Regenerate the SVG artwork in `public/images`       |

---

## Design system

Everything lives in [`src/app/globals.css`](src/app/globals.css) as Tailwind v4 `@theme`
tokens — there is no `tailwind.config.js`.

**Colour.** The primary brand ramp is anchored on **Old Glory Blue `#002868`**
(`--color-brand-900`) and extended into a full 50–950 scale so interactive states have
somewhere to go. **Old Glory Red `#BF0A30`** (`--color-flag-700`) is deliberately
rationed — it appears only on genuinely urgent affordances (the emergency line, the
emergency card on `/contact`) and as a single hairline accent in the footer. `ink-*` is
the neutral ramp; `ink-500` is tuned to 5.0:1 on white so small secondary text always
passes AA.

**Type.** Plus Jakarta Sans for display, Inter for body, both via `next/font` with
`display: swap`. Headings use fluid `clamp()` sizes (`text-display-2xl` → `text-display-md`)
so nothing needs per-breakpoint overrides.

**Composed utilities.** `container-page`, `section-y`, `glass`, `glass-dark`, `bg-grid`,
`bg-grid-ink`, `text-gradient-brand`, `text-gradient-light`, `no-scrollbar`.

**Motion.** All entrance animation goes through `<Reveal>` / `<StaggerGroup>`
(`src/components/ui/Reveal.tsx`), which animate transform + opacity only and return
static markup when `prefers-reduced-motion` is set. `globals.css` also neutralises CSS
animations for the same users.

---

## Structure

```
src/
├─ app/                      routes (App Router)
│  ├─ layout.tsx             fonts, metadata, header/footer, skip link, JSON-LD
│  ├─ page.tsx               homepage
│  ├─ services/              index + [slug] (SSG via generateStaticParams)
│  ├─ products/              searchParams-driven catalogue + loading.tsx skeleton
│  ├─ projects/ about/ contact/ faq/ privacy/ terms/
│  ├─ not-found.tsx  sitemap.ts  robots.ts  opengraph-image.tsx  icon.svg
├─ components/
│  ├─ layout/                Header (mega-menu + drawer), Footer, MobileCallBar
│  ├─ sections/              homepage sections
│  ├─ products/ projects/ services/ contact/ legal/   feature components
│  ├─ ui/                    Button, Section, Reveal, Accordion, Counter, Skeleton…
│  └─ seo/JsonLd.tsx         structured data
├─ lib/
│  ├─ site.ts                brand, contact details, navigation  ← edit this first
│  ├─ icons.tsx              name → Lucide component registry + <Icon>
│  ├─ hooks.ts  utils.ts
│  └─ data/                  services, products, projects, testimonials, faqs
└─ scripts/generate-images.mjs
```

**Content is data-driven.** Adding a service creates its detail page, its mega-menu
entry, its sitemap row, its contact-form option and its structured data — all from one
object in `src/lib/data/services.ts`.

---

## Responsiveness

Verified at 390 (mobile), 834 (tablet), 1024, 1280 and 1440 px with no horizontal
overflow at any width.

- The mega-menu is anchored to the **header container**, not the trigger button, so it
  can never run off-screen on narrow desktops.
- Below `lg` the nav becomes a spring-animated drawer with per-section accordions and a
  scroll lock.
- A thumb-reachable **call / quote bar** appears on small screens once the user scrolls
  past the hero, and hides itself on `/contact` where it would be redundant.
- Filter rails scroll horizontally on small screens and wrap on large ones.

---

## Accessibility

`axe-core` (WCAG 2.1 A/AA + best-practice) reports **zero violations** across all nine
routes at both 390 px and 1440 px.

- Skip link, one `<h1>` per page, unbroken heading order.
- Single high-contrast focus ring defined once in `globals.css`.
- Accordion, carousel, filter tabs, dialog and switch patterns all carry correct roles,
  `aria-expanded` / `aria-controls` / `aria-selected` and keyboard handling (Escape
  closes the menu and drawer).
- Counters expose the final value to screen readers via `sr-only` while the visible
  digits animate.
- The carousel pauses on hover **and** on focus.
- Form errors are announced with `role="alert"`, linked with `aria-describedby`, and
  focus moves to the first invalid field.

---

## SEO

- Per-route `metadata` with a title template, canonicals, Open Graph and Twitter cards.
- Generated `sitemap.xml`, `robots.txt`, `icon.svg` and a dynamic `opengraph-image`.
- JSON-LD for `ElectricalContractor`, `WebSite`, `Service`, `FAQPage` and `BreadcrumbList`.
- Semantic landmarks, descriptive link text, and `alt` text on every meaningful image.

---

## Performance

- Every page except `/contact` and `/products` is fully static; service detail pages are
  pre-rendered with `generateStaticParams`.
- `optimizePackageImports` tree-shakes the `lucide-react` and `framer-motion` barrels.
- `next/image` everywhere, with AVIF/WebP output, explicit `sizes`, lazy loading by
  default and `priority` only on above-the-fold art.
- The `/products` catalogue streams behind a `<Suspense>` boundary backed by a real
  skeleton grid; `loading.tsx` covers the route transition.
- Artwork is generated vector (2–6 kB per file) rather than stock photography, so there
  is nothing heavy to download and nothing to go blurry on a retina display.
- Long-lived immutable caching plus a security header set (HSTS, nosniff,
  `Referrer-Policy`, `Permissions-Policy`) in `next.config.ts`.

---

## Making it yours

1. **Brand, contact details, navigation** → `src/lib/site.ts`
2. **Colours and type** → the `@theme` block in `src/app/globals.css`
3. **Content** → `src/lib/data/*`
4. **Artwork** → drop real photography into `public/images` using the same filenames, or
   point `next.config.ts`'s `remotePatterns` at your CDN. Every consumer already uses
   `next/image`, so nothing else changes.

### Wiring up the forms

The contact and newsletter forms are complete on the client — validation, error
summaries, loading and success states — but their submit handlers currently resolve a
timer instead of calling an API. Point them at a route handler, CRM webhook or form
service:

- `src/components/contact/ContactForm.tsx` → `handleSubmit`
- `src/components/layout/NewsletterForm.tsx` → `handleSubmit`

### Placeholder content

Business name, licence numbers, phone numbers, addresses, review counts and project
figures are illustrative and must be replaced with real details before launch.
