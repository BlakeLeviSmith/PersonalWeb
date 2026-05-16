# Personal Site — Build Spec

A single-page editorial portfolio for Blake Shorter. Charlotte, NC. The site exists to make a credible first impression on professors, founders, investors, and partner organizations who land here after a referral, an email, or a conference handoff. It is not a tech-bro showcase, and it should not read like one.

The aesthetic target is closer to an editorial spread than a developer portfolio. Generous whitespace, big imagery, oversized numbers, and short prose. Think of the kind of layout you would expect from a small architecture studio or a research lab that cares about its visual identity. ReactBits supplies the motion vocabulary; it does not get to dictate the layout.

---

## 1. Tech Stack

* Framework: Next.js (App Router) on TypeScript
* Styling: Tailwind CSS with custom theme tokens defined in `tailwind.config.ts`
* Motion: react-bits (https://github.com/DavidHDev/react-bits) installed per-component via the CLI, not as a global dependency
* Fonts: self-hosted via `next/font` to avoid the layout shift you get with Google Fonts
* Hosting: Vercel, custom domain to be decided
* Analytics: Vercel Analytics, nothing else for v1
* Forms: none in v1; contact is a `mailto:` link

Constraint: no headless CMS, no MDX, no animation libraries beyond react-bits and Framer Motion if react-bits already depends on it. Content lives as typed objects in `/lib/content.ts` so editing copy is a single-file change.

---

## 2. Design System

### Color Palette

Define these as Tailwind theme extensions, not arbitrary hex values scattered through components.

| Token | Hex | Usage |
|---|---|---|
| `bg.canvas` | `#F4EFE7` | Page background, the dominant cream |
| `bg.surface` | `#FBF9F4` | Cards, elevated sections |
| `bg.contrast` | `#1F1B16` | Inverse sections (footer, accent blocks) |
| `text.primary` | `#1F1B16` | Body copy, headlines |
| `text.secondary` | `#6B6359` | Captions, metadata, eyebrow labels |
| `text.muted` | `#A39A8C` | Timestamps, low-priority labels |
| `accent.tan` | `#B89B7A` | Single accent color, used sparingly |
| `border.sand` | `#E4DCCF` | Hairline dividers, card borders |

Rule: no blues, no saturated colors, no gradients except subtle cream-to-canvas washes on section transitions. The accent tan is the only chromatic note on the page and it should appear no more than a handful of times.

### Typography

* Display serif: **Fraunces** (variable, opsz axis). Use it for the hero name, section labels, and the oversized numbers.
* Body sans: **Inter**. Use it for prose, captions, navigation.
* Numerics: Fraunces in display weight for the hero stats. Inter tabular-nums for in-prose numbers.

Type scale (mobile first, desktop in parens):
* `text-stat`: 96px / 1.0 / -0.04em tracking (desktop: 180px)
* `text-display`: 56px / 1.05 / -0.03em tracking (desktop: 96px)
* `text-h2`: 32px / 1.15 (desktop: 48px)
* `text-h3`: 22px / 1.3 (desktop: 28px)
* `text-body`: 17px / 1.55
* `text-caption`: 13px / 1.4, uppercase, `tracking-[0.12em]`, color `text.secondary`

The eyebrow caption pattern (uppercase, letter-spaced, secondary color) is doing a lot of the editorial work. Use it above every section title.

### Spacing & Layout

* Max content width: `max-w-[1280px]` with `px-6 md:px-12 lg:px-20`
* Section vertical padding: `py-24 md:py-40`
* Grid: 12-column on desktop, single column on mobile, with explicit `col-span` on each child rather than dense grids
* Hairline dividers between sections use `border-sand` at 1px; no full-width section backgrounds unless contrast is intentional

### Imagery

Every project section has one large lead image at roughly 16:10 or 4:5, placed with intentional asymmetry (not always centered). Images should be desaturated slightly in post or via a CSS `filter: saturate(0.92)` to sit inside the warm palette. Placeholder slots in the codebase as `/public/images/[project]-lead.jpg` with width/height attributes set explicitly to prevent CLS.

---

## 3. ReactBits Usage

Install only what is used. Suggested components and where they go:

* `SplitText` or `BlurText` — hero name reveal on first paint
* `ShinyText` — single use on the hero subtitle or status line
* `CountUp` — every oversized number on the page animates on scroll into view
* `FadeContent` or `AnimatedContent` — section reveals, with a longer duration than the defaults (target 700ms, ease-out)
* `TiltedCard` — project cards in the Work section, very subtle tilt amount (max 5deg)
* `Magnet` — optional, on the contact link in the footer

Do not use: aurora backgrounds, particle effects, anything with neon or saturated color, infinite marquees, or starfield components. They fight the editorial tone.

Animation rule of thumb: motion should reveal content, not perform. If a reader notices the animation more than the content it is wrong.

---

## 4. Page Structure

Single long-scroll page. Fixed slim nav at the top with anchor links to each section. Section order matters and is set below.

### 4.1 Nav

Fixed top, transparent over canvas, with a subtle backdrop blur that activates after 80px of scroll. Left side: "Blake Shorter" in Fraunces, small. Right side: anchor links to Work, Research, Education, Contact. No mobile hamburger; collapse to a single "Menu" link that opens a full-screen overlay.

### 4.2 Hero

Two-line treatment, left-aligned, taking the full first viewport.

* Eyebrow: `BUILDER · CHARLOTTE, NC`
* Display headline: `Blake Shorter`
* Subhead, one sentence: `High school junior building AI products for cities, homes, and small businesses.`
* Below the fold cue: a thin animated indicator and the current date stamp in caption type.

No headshot in the hero. Save imagery for the project sections.

### 4.3 At a Glance (stats row)

A horizontal row of four oversized numbers, each with a one-line caption underneath. Numbers animate with `CountUp` when they enter the viewport.

| Number | Caption |
|---|---|
| 400 | Modera waitlist signups |
| 6 | Partner organizations using Charlotte Canopy |
| 50K+ | Trees in the Charlotte Canopy network |
| 35K+ | Charlotte residents reached |

This is the highest-density information block on the page and it should be the visual anchor of the entire site. Numbers in Fraunces display weight, captions in Inter caption style.

### 4.4 Work

Three project blocks, each given the full editorial treatment. Order: Modera, Charlotte Canopy, Truckside. Modera leads because it is the primary commercial focus. Charlotte Canopy follows because it carries the strongest external validation. Truckside closes because it is the earliest stage of the three.

#### Modera — modera.studio

This is the priority commercial project. It gets the second-largest real estate after Canopy and leads the Work section.

* Eyebrow: `CONSUMER AI · iOS BETA`
* Title: `Modera`
* Lead image: a render or screen capture of the iPhone scan-to-design flow
* Body, two short paragraphs:

  > An AI 3D interior design platform for homeowners. Scan a room with an iPhone, prompt a style, and generate furniture-accurate design variations in seconds. Built on Apple's native renderer, with a unit economics target that lets the consumer flow stay close to free.

  > Currently in closed beta with the next cohort of homeowners moving from waitlist to TestFlight.

* Stat strip, three numbers:
  * `400` waitlist signups
  * `20` active beta users
  * `1` solo founder

* Programs strip below the stats, in caption type with hairline dividers. This is a credentials row, not a stats row, and the visual treatment should be smaller and quieter than the numbers above it. Render the Google Cloud for Startups and NVIDIA Inception logos as monochrome lockups in the warm grey tone, not full-color brand marks, so they sit inside the palette instead of fighting it. Logos are separated by a `text.muted` vertical hairline, with a small `BACKED BY` caption above the row.

---

#### Charlotte Canopy — charlottecanopy.org

This is the most externally-validated project and gets the most real estate on the page. It deserves a two-screen treatment: an overview block, then a partners block.

**Overview block:**
* Eyebrow: `URBAN HEAT · LIVE DEPLOYMENT`
* Title: `Charlotte Canopy`
* Lead image: screenshot of the heatmap with an intervention drawn on it
* Body, two short paragraphs:

  > A browser-based urban heat island simulator for Charlotte. Planners, neighborhood leaders, and nonprofits open the heatmap, draw an intervention like a new park or a roof change, and see the cooling delta in under a second. Same XGBoost model as the OpenUSD desktop platform from the state competition, now reachable from any phone in the field.

  > Since launch the simulation has moved from prototype to active use. Six organizations across research, neighborhood advocacy, housing, and urban forestry are now using or evaluating the dataset.

* Three-up feature row, each with a small caption and a one-line description:
  * `FREE & OPEN` — No install, no signup. Any browser, any device.
  * `LIVE PREDICTIONS` — Draw a park or change a roof, see the cooling delta in under a second.
  * `DOWNLOADABLE DATA` — All 255,760 cells exportable as CSV or GeoJSON.

**Partners block (immediately after):**
* Eyebrow: `LAUNCHED PARTNERS`
* A vertical list of partner cards, not a grid. Each card has a large stat number on the left, the partner name and one-line descriptor centered, and a short prose line on the right. Hairline divider between each.

  | Stat | Partner | Role |
  |---|---|---|
  | 30,000+ | Camino | Health, education, and community center programs serving Charlotte's Latino population, using the model to map heat exposure for clinic outreach zones. |
  | 350+ homes | McCrorey Heights Neighborhood Association | Historically Black middle-class enclave founded in 1912, on the National Register of Historic Places since 2017, using heat data to prioritize tree-canopy advocacy with the city. |
  | 6 neighborhoods | West Blvd Neighborhood Coalition | Coalition representing Reid Park, Wilmore, Wesley Heights, and adjacent neighborhoods along the West Blvd corridor, identifying intervention priorities. |
  | 5,000+ | Roof Above | Charlotte's largest homelessness nonprofit, formed from the Urban Ministry Center and Men's Shelter merger in 2020, layering heat data on outreach routes to flag dangerous days. |

* Below the partners list, a "Newest Launch" callout for TreesCharlotte:
  * `NEWEST LAUNCH`
  * `TreesCharlotte · 50,000+ trees planted since 2013`
  * One paragraph: Partnership confirmed with the Director of Programs, the Urban Forest Educator, and the Community Engagement Manager. TreesCharlotte uses the platform to data-optimize where they direct planting and to power urban forestry education programming, pairing the existing 50K+ planted trees with model-prioritized future-planting blocks.

* And a smaller "In Progress" callout for UNC Charlotte CHARP / Charlotte Heat Mappers:
  * `IN PROGRESS · REFERRAL`
  * One sentence: UNCC professor-led citizen heat-mapping campaign, referred by TreesCharlotte's Director of Programs, currently evaluating their volunteer-collected ground-truth dataset alongside the ECOSTRESS-derived predictions for cross-validation.

* Bottom-of-section totals row, four numbers:
  * `6` partner orgs
  * `35K+` residents reached
  * `50K+` trees in network
  * `8+` neighborhoods

#### Truckside — truckside.co

* Eyebrow: `OPERATIONS AI · PILOT`
* Title: `Truckside`
* Lead image: photo of a food truck at night, or the hardware stack
* Body, one paragraph:

  > A voice ordering automation system for food trucks, running local inference on-truck with card-only payments and a transparent hardware-at-cost plus software subscription model. The first pilot is wrapping at a Charlotte truck this month, with paid non-family contracts targeted next.

* No stat strip; the project is too early to brag with numbers. A single status line in caption type: `STATUS · FIRST PILOT IN PROGRESS, CHARLOTTE NC`

### 4.5 Research

* Eyebrow: `RESEARCH AFFILIATION`
* Title: `Duke University`
* One paragraph:

  > Research affiliation at Duke under Daniel Egger, who leads the Master in Interdisciplinary Data Science program at the Social Science Research Institute. Final official position pending.

Visually this is the lightest section. Single column, no image, narrow measure for the prose. It should feel like a short editorial note, not a project pitch.

### 4.6 Education

* Eyebrow: `EDUCATION`
* Title: `Schools`
* A simple two-column list, school on the left, role and timeframe on the right, hairline divider between rows. No images.

  | School | Role |
  |---|---|
  | North Carolina School of Science and Mathematics | Current, junior |
  | UNC Charlotte | Coursework, no degree |
  | Central Piedmont Community College | Coursework, no degree |

### 4.7 Building & Competing

A combined section that handles the FTC scoring tool and the competition placements. Lighter weight than Work. The FTC piece gets the bulk of the attention because there is a real artifact attached (the demo video). FBLA and TSA are one-line mentions in a small list.

**FTC scoring tool block:**
* Eyebrow: `FIRST TECH CHALLENGE · WORLDS COMPETITOR`
* Title: `FTC scoring assistance tool`
* Embedded demo video at 16:9, autoplay disabled, muted by default, with a poster frame
* One paragraph:

  > A passive computer vision referee aid for FTC matches, running on an ESP32 camera with 99%+ ball detection accuracy in test conditions. Currently in discussion with the event coordinator for the CPE event, not yet an official deployment.

**Competitions list, immediately below the FTC block:**
* Eyebrow: `RECENT COMPETITIONS`
* A two-line list, no images, in caption type:
  * `TSA Nationals · Geospatial Technology · June 2026`
  * `FBLA Business Plan · Top 10 States · March 2026`

### 4.8 Footer / Contact

Inverse section using `bg.contrast` and cream type. Three columns on desktop, stacked on mobile.

* Left: "Blake Shorter" in Fraunces display, with a Magnet-effect email link below
* Middle: short location line, `Charlotte, NC`, and a current-year stamp
* Right: small links to GitHub, LinkedIn, and Twitter/X

No newsletter signup, no "let's work together" CTA copy. The email link is the call to action and it stands alone.

---

## 5. Content as Data

All copy lives in `/lib/content.ts` as typed objects so it can be edited without touching components.

```ts
// shape, not full content
export const projects: Project[] = [...]
export const partners: Partner[] = [...]
export const stats: Stat[] = [...]
export const competitions: Competition[] = [...]
```

Each `Project` carries title, eyebrow, url, lead image path, body paragraphs, stat strip, and optional partner list. This is the only place copy lives.

---

## 6. Placeholder Strategy

The site is built end-to-end with placeholder boxes in place of every image, logo, and video. Images are sourced and dropped in only after the layout, motion, and content flow are signed off. This is a hard constraint, not a suggestion: every component that consumes an image must accept a `placeholder` prop and render a styled box of the correct dimensions when no image is provided.

### Placeholder visual treatment

Placeholders are not the default grey debug boxes. They are designed to look intentional so the site is reviewable and shareable in placeholder mode without looking broken.

* Background: `bg.surface` (`#FBF9F4`)
* Border: 1px solid `border.sand` (`#E4DCCF`)
* Internal hairline diagonal stripe at 45deg, 1px, `border.sand`, opacity 0.4, repeating every 24px. This is the visual signal that the box is a placeholder, applied via a CSS background pattern.
* Centered label, two lines, in caption type:
  * Line 1: the asset filename, lowercase, in `text.muted` (`#A39A8C`)
  * Line 2: the dimensions and aspect ratio, e.g. `2400×1500 · 16:10`, in `text.muted` at 80% size

### Placeholder component

A single shared `<Placeholder>` component handles every box on the page. Shape:

```tsx
<Placeholder
  filename="modera-lead.jpg"
  aspectRatio="16/10"
  label="iPhone scan-to-design flow"
/>
```

The `label` prop is optional and adds a third line in caption type below the dimensions, describing what the image should depict. Use it on every project lead image so a reviewer can read the spec from the page itself.

### Per-asset-type rules

* **Lead images:** full placeholder treatment with filename, dimensions, and descriptive label
* **Logos (Google Cloud, NVIDIA Inception, Canopy partners):** small placeholder pills that show the org name in caption type with the same border and stripe treatment, sized to roughly the height of two lines of caption text. No filename needed; the name is the content.
* **FTC video:** placeholder box at 16:9 with a centered "play" triangle drawn in SVG (espresso on surface), filename `ftc-demo.mp4`, and the descriptive label `FTC scoring tool demo`. The triangle indicates videoness without needing a real poster frame.
* **OG image and favicon:** these are configured in `next/head` and Metadata API and can be left pointing at a single placeholder SVG until launch. They do not need to render on the page itself.

### Review-ready in placeholder mode

The site should pass a visual review at the placeholder stage. That means whitespace, type rhythm, section pacing, and motion all need to land without the visual crutch of imagery. If a section looks empty or unbalanced when its images are placeholders, the layout is wrong, not the image strategy. Fix the layout before adding images.

---

## 7. Accessibility & Performance

* Every animation respects `prefers-reduced-motion`; the SplitText and CountUp components have static fallbacks
* Color contrast for body text on the cream canvas meets WCAG AA; the accent tan is never used for body copy, only for ornament
* All images carry width, height, and alt; lead images use `next/image` with priority on the hero only
* Target Lighthouse: 95+ on Performance, Accessibility, Best Practices, SEO on the production build
* No third-party scripts beyond Vercel Analytics

---

## 8. Out of Scope for v1

Calling these out explicitly so they do not creep in:

* No blog, no writing index, no MDX pipeline
* No dark mode toggle; the palette is the palette
* No CMS, no admin panel
* No contact form, just `mailto:`
* No internationalization
* No animated cursor, no custom scrollbar, no scroll-jacking
* No project case-study sub-pages; everything lives on the long scroll

If something on this list later earns its way back in, it earns its way back in deliberately, not as scope creep during the initial build.

---

## 9. Build Order

A suggested order so the site is shippable at each checkpoint. Every step ships with placeholders in place of images; real image swap-in is its own dedicated pass at the end.

1. Project scaffold, theme tokens, fonts, and nav shell
2. The shared `<Placeholder>` component, fully styled per section 6
3. Hero and stats row, fully styled with placeholder content
4. Modera block with stat strip and programs credentials row, using placeholder logos for Google Cloud and NVIDIA Inception
5. Charlotte Canopy block, including the partners list with placeholder partner logos
6. Truckside block
7. Research and Education sections
8. FTC block with video placeholder, then the competitions list
9. Footer
10. react-bits motion pass across the whole page
11. Review checkpoint: the site is reviewed end-to-end in placeholder mode. Layout, type, motion, and pacing must land without imagery before moving on.
12. Image and logo swap-in pass: drop real assets into `/public/images/` and remove placeholder props
13. Lighthouse pass, accessibility pass, deploy

The site should look credible by step 5 in placeholder mode, and the image swap at step 12 should be a one-file-at-a-time change with no layout adjustments.
