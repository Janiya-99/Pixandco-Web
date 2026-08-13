# Sanjaya Framer Template — Full Design & Content Reference Guide

> **Purpose**: Apply the content structure, animations, layout patterns, and design language of the Sanjaya AI Agency Framer template to the Pixandco Next.js project.

---

## 1. Brand & Identity

- **Brand Name**: Sanjaya (AI Automation Agency)
- **Tagline**: *Clear. Precise. Automated.*
- **Positioning**: "Get more discovery calls, build instant credibility, and look like the premium AI agency you are."
- **Contact**: info@sanjaya.ai | +12 345 678

---

## 2. Color System

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#010004` | Page background (near black, slight purple) |
| `--color-surface` | `#1a1a1d` | Cards, inputs, surfaces |
| `--color-surface-2` | `#212121` | Slightly lighter surfaces |
| `--color-border` | `#323135` | Card borders, dividers |
| `--color-border-subtle` | `#ffffff1a` | Hairline borders (10% white) |
| `--color-text-primary` | `#ffffff` | Headlines, primary text |
| `--color-text-muted` | `#a8a8a8` | Body text, descriptions |
| `--color-text-dimmed` | `#ffffff40` | Placeholders, very dim labels |
| `--color-accent` | `#00ff51` | Green accent — CTAs, highlights |
| `--color-overlay` | `#01010140` | Dark overlay on images |
| `--color-text-light` | `#dedede` | Light grey text variant |

---

## 3. Typography

### Font Stack
```css
--font-primary: 'Geist', sans-serif;      /* Main headings + body */
--font-mono: 'Geist Mono', monospace;     /* Labels, eyebrows, code */
--font-secondary: 'Inter', sans-serif;    /* Fallback / UI text */
```

### Type Scale
| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Hero H1 | Geist | 64–80px | 600 | tracking `-.04em` |
| Section H2 | Geist | 48–56px | 600 | |
| Card H3 | Geist | 32–40px | 500 | |
| Eyebrow | Geist Mono | 11–12px | 400 | uppercase, tracking `0.2em` |
| Body | Geist / Inter | 16–18px | 400 | line-height 1.6 |
| Small/Muted | Geist | 14px | 400 | color: #a8a8a8 |
| Price | Geist | 48px | 700 | |
| Stats Counter | Geist | 64px+ | 700 | bold animated number |

---

## 4. Page Structure (Section Order)

```
1. Navigation Bar         ← Fixed, top
2. Hero Section           ← Split: text left, 3D MP4 right
3. Trusted Companies      ← Logo marquee ticker
4. Problems Section       ← Concentric rings + floating badges
5. Our Works / Projects   ← Sticky stacked project cards
6. How It Works           ← 3-step numbered process
7. Integration Section    ← Tool logo grid
8. Services               ← 4-column service cards
9. Why Us / Comparison    ← 3-column comparison table
10. Testimonials + Stats  ← Quote cards + animated counters
11. Pricing               ← 3-tier cards with monthly/yearly toggle
12. Blog                  ← 3 blog post cards
13. FAQ                   ← Accordion expand/collapse
14. CTA Form              ← Full-width CTA with email input
15. Footer                ← Multi-column with nav + socials
```

---

## 5. Section-by-Section Content & Animations

---

### 5.1 Navigation Bar

**Layout**: Fixed, full-width, `z-index: 10`

**Left**: Logo
**Center**: `Home` | `About` | `Projects` | `Blog` | `Contact`
**Right**: `Book 15-mins call` (accent bordered button)

**Scroll behavior**: background becomes `rgba(1,0,4,0.8)` + `backdrop-filter: blur(12px)` on scroll.

---

### 5.2 Hero Section

**Layout**: 2-col desktop (max-width 1240px), stacked mobile

**Left column (max 400px)**:
```
[3 Eyebrow Chips]
/ AI Automation
/ AI Integration
/ AI Agent Development

[H1]
WE AUTOMATE 100+ BUSINESSES

[Avatar row]
[Photo of Clarissa]
Talk with Clarissa
director of sanjaya

[Primary CTA]
Book 15-mins call
```

**Right column**: MP4 video loop (AI/3D animated visualization), ~350×350px

**Framer Motion Page-Load Animations**:

| Element | Initial | Final | Delay | Duration |
|---|---|---|---|---|
| Eyebrow chips | `opacity:0, y:30` | `opacity:1, y:0` | 0.5s | 1s |
| H1 Headline | `opacity:0, y:30` | `opacity:1, y:0` | 0.5s | 1s |
| Description | `opacity:0, y:20` | `opacity:1, y:0` | 0.6s | 1s |
| CTA Button | `opacity:0, y:20` | `opacity:1, y:0` | 0.7s | 1s |
| Avatar row | `opacity:0, y:20` | `opacity:1, y:0` | 1.0s | 1s |
| Right visual | `opacity:0, scale:0.8` | `opacity:1, scale:1` | 1.0s | 1s |

> All: `type: "spring", bounce: 0` (no bounce, smooth deceleration)

---

### 5.3 Trusted Companies Marquee

**Label**: `TRUSTED COMPANIES ACROSS INDUSTRIES`
**Content**: 8–10 company logos scrolling left infinitely (duplicated for seamless loop)

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-track {
  display: flex;
  animation: marquee 20s linear infinite;
  width: max-content;
}
```

Logo height: ~40–50px. Muted/desaturated appearance on dark bg.

---

### 5.4 Problems Section

**Eyebrow**: `/ THE OPERATIONAL GAP`
**H2**: `The Hidden Cost of Manual Work`
**Section ID**: `#problems`
**Height**: `300vh` (sticky scroll container)

**Concentric Rings**:
- Ring 1: `560px lg` — CW rotation, 15s, starts 0°
- Ring 2: `820px lg` — CCW rotation, 25s, starts 120°
- Ring 3: `1120px lg` — CW rotation, 35s, starts 240°
- Style: `conic-gradient` comet tail (transparent → white), CSS mask to make ring-shaped
- Fixed size — NO scale animation. Fades in/out with scroll opacity.

**Floating Badges** (scroll-triggered, then bob forever):

| Badge | Position | Scroll Range |
|---|---|---|
| `Wasted Resources` | top-right | 15%–25% |
| `Siloed Communication` | bottom-left | 28%–38% |
| `Lack of Visibility` | top-center | 40%–50% |
| `Tedious Onboarding` | mid-left | 52%–62% |
| `Fragmented Workflows` | bottom-right | 65%–75% |

**Badge Style**: `bg: #121214`, `border: 1px solid rgba(255,255,255,0.05)`, `px-3.5 py-1.5`, `text-[11px] font-medium`, tiny square `■` bullet
**Bob animation**: `y: [0, -8, 0]`, `duration: 3.5–4.8s`, `repeat: Infinity`, `ease: easeInOut`

---

### 5.5 Our Works / Projects

**Eyebrow**: `OUR WORKS`
**Description**: `Selected workflow transformations across sales, operations, and internal systems.`

**Layout**: Sticky stacked cards — `position: sticky; top: 12vh`, increasing `z-index`

**Projects**:

```
Batavia | 2026 | E-commerce
"Scaling Batavia's Digital Product Store with Automation"
Helping Batavia automate product delivery and customer workflows so their
digital store can handle more sales with less manual work.
Metrics: 22+ hours saved weekly | 2.4x more repeat purchases

Mandala | E-commerce
"Scaling Mandala's E Commerce Operations with Automation"
Helping Mandala automate order processing and customer workflows to handle
more sales without increasing operational workload.
Metrics: 45% faster order processing | FASTER NOTIFICATIONS

Pandawa | UGC Agency
"Scaling Pandawa's SaaS Operations with Automation"
Helping Pandawa automate customer onboarding and internal workflows to scale
faster without adding more operational overhead.
Metrics: 40% Faster customer onboarding | 18+ Hours Saved Weekly
```

**Footer CTA**: `See All Case Studies →`

**Card Animation**:
- Image: `scale 1.1→1.0, opacity 0→1` as card enters (scrub)
- When next card overlaps: current image fades to `opacity: 0.2`, content to `opacity: 0.4`
- `box-shadow: 0 -20px 40px rgba(0,0,0,0.5)` for depth

---

### 5.6 How It Works

**Eyebrow**: `HOW IT WORKS`
**Description**: `We design automation that removes friction, sharpens workflows, and helps your team operate with clarity and control.`

**Layout**: 3-column grid

```
1. Understand Your Workflow
   We analyze your workflow, tools, and bottlenecks.

2. Design & Build the System
   We implement automation tailored to your business.

3. Optimize & Scale
   We refine, improve, and scale as your operations.
```

Each step: Image card (4:3 ratio) + gradient overlay, numbered title, description below.

---

### 5.7 Integration Section

**Eyebrow**: `INTEGRATION`
**Text**: `Your CRM, marketing, finance, and operations tools working as one unified workflow. We integrate with the platforms you already use.`

**Visual**: 11+ tool logos in responsive grid (3–4 cols desktop). Logos are 352×352px tiles.

---

### 5.8 Services

**Eyebrow**: `SERVICES`
**Description**: `We design intelligent systems that streamline workflows, strengthen revenue processes, and connect your tools into one cohesive ecosystem.`

**4 Service Cards**:

```
/ 01  Workflow Automation
      Structured systems that eliminate repetitive work.
      • Workflow audits
      • Cross-Platform Tool Integration
      • Build scalable internal systems
      • Internal Operations Automation

/ 02  AI-Powered Systems
      Intelligence embedded into your operations.
      • AI Lead Qualification Systems
      • AI Data Processing & Enrichment
      • Custom GPT Internal Assistants
      • Smart Routing & Decision Logic

/ 03  Sales & Revenue Automation
      Predictable, scalable revenue infrastructure.
      • Automated Lead Capture & Distribution
      • CRM Pipeline Automation
      • Follow-Up & Nurture Sequences
      • Revenue Performance Dashboards

/ 04  System Optimization & Integration
      Connect, refine, and scale your tech stack.
      • Tech Stack Audit & Restructuring
      • API & Platform Integrations
      • Workflow Optimization
      • Performance Monitoring Systems
```

**Card style**: `bg: #1a1a1d`, border `#323135`, numbered prefix in Geist Mono.

---

### 5.9 Why Us — Comparison Table

**Eyebrow**: `WHY US`
**Headline**: `Most agencies talk about AI. We build systems that reduce manual work, improve accuracy, and scale with your operations.`

| | **Sanjaya** | Other Agencies | Hire In House |
|---|---|---|---|
| Approach | Process mapping first | Tool-first approach | Depends on hire |
| Workflow | Around your operations | Mostly templated | If expertise exists |
| Speed | Weeks, not months | Most often delayed | Hiring & onboarding |
| Optimization | Continuous improvement | Setup & disappear | Limited by bandwidth |
| Cost Efficiency | Fixed project clarity | Scope creep common | Salary + overhead |

Sanjaya column has accent border/highlight to stand out.

---

### 5.10 Testimonials + Stats Counters

**Eyebrow**: `TESTIMONIALS`

**3 Testimonials**:
```
"Sanjaya helped us turn a messy process into a clear system. Tasks that used to
take hours of manual work now run automatically, and our team can focus on what
really matters."
— Cristin Tambun, Founder of Pandawa

"Working with Sanjaya completely changed how we handle our operations. What used
to feel chaotic is now organized, automated, and much easier to track."
— Simon Tedjo, Founder of Shinta

"Sanjaya helped us restructure our entire sales workflow. What used to require
manual coordination across multiple tools is now automated and measurable."
— Sinta Widjaja, Founder of Mandala
```

**Animated Stats** (count up from 0 on viewport enter):
| Stat | Value |
|---|---|
| Workflows Automated | `50%` |
| Time Saved | (animated) |
| Process Efficiency | `70%` |
| Less Human Error | (animated) |

---

### 5.11 Pricing

**Eyebrow**: `PRICING`
**Toggle**: `Monthly` / `Yearly (-20%)` — smooth animated price swap

```
STARTER — $4,999/mo (Monthly) | $3,999/mo (Yearly)
For teams getting started with AI
[Choose Starter Plan]  30-day money-back guarantee
✓ 1–2 workflow automations
✓ Tool integration setup
✓ AI implementation
✓ Basic reporting dashboard
✓ 2 weeks post-launch support

GROWTH [popular] — $6,999/mo | $5,999/mo
For scaling teams ready to streamline operations
[Choose Growth Plan]
✓ 3–5 automation workflows
✓ CRM and marketing stack integration
✓ Custom AI agents or assistants
✓ Team onboarding session
✓ 30 days optimization support

ENTERPRISE — $7,999/mo
For organizations serious about long-term efficiency
[Choose Enterprise Plan]
✓ Full workflow audit
✓ End-to-end automation architecture
✓ Custom AI agent development
✓ Internal system documentation
✓ Ongoing optimization roadmap
```

---

### 5.12 Blog

**Eyebrow**: `BLOG & See More →`

```
[Announcement] March 6, 2026
Building Smarter AI Tools for the Future of Scalable Businesses

[Tips]
How to Get 1000% Better Results From AI With Smarter Workflows

[Announcement]
Announcing Our New Funding Round to Series A
```

3-column card grid. Each card: image top, tag pill, date, title.

---

### 5.13 FAQ

**Eyebrow**: `FAQ`
**Layout**: Accordion (click to expand, chevron rotates 180°)

```
Q: What does Sanjaya actually do?
A: Sanjaya is an AI automation agency. We help businesses streamline their
workflows, reduce manual tasks, and build refined systems using automation and AI.

Q: What kind of businesses do you work with?
A: Startups, SaaS companies, digital agencies, and growing online businesses —
teams that want to automate repetitive work and scale without adding manual tasks.

Q: Do you replace our existing tools?
A: No. We connect and optimize tools you already use. Our goal is to make your
systems work better together, not replace everything.

Q: How long does implementation take?
A: Most automation systems take 2–4 weeks. Timeline depends on workflow
complexity and number of tools to integrate.

Q: Do you offer ongoing support?
A: Yes. We help maintain, improve, and expand your automation system as your
business grows.

Q: How do we get started?
A: Book a discovery call. We review your workflows, identify automation
opportunities, and propose a tailored solution.
```

---

### 5.14 CTA Section

```
LET'S GET STARTED

Share your current process. We'll help you identify what can be automated
and where efficiency can be improved.

[Get Free Consultation]
```

---

### 5.15 Footer

```
Col 1: Logo + "Clear. Precise. Automated." + © 2026 sanjaya. All Rights reserved.
Col 2: navigation — Home | About | Privacy Policy | Terms and Condition | 404
Col 3: socials — Email: info@sanjaya.ai | Phone: +12 345 678
Col 4: Subscribe to our Newsletter [input + Submit]
```

---

## 6. Global Animation Patterns

### Standard Scroll Reveal (used everywhere)
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ type: "spring", bounce: 0, duration: 1, delay: 0.1 }}
```

### Stagger Pattern (grid items)
```
Item 0: delay 0.5s
Item 1: delay 0.6s
Item 2: delay 0.7s
Item 3: delay 1.0s
Item 4: delay 1.1s
```

### Hover States
- Cards: `scale(1.02)` or border color shift
- Buttons: bg lightens/darkens slightly  
- Nav links: opacity 0.7 → 1.0

### Counter Animation
Numbers count from 0 to target when section enters viewport.
Use `useInView` + `useMotionValue` + `useEffect` with rAF, or a library like `react-countup`.

---

## 7. Components to Build

| Component | Description |
|---|---|
| `<MarqueeTicker>` | Infinite horizontal logo scroll |
| `<ConcentricRings>` | 3 rotating comet-tail circles ✓ (done) |
| `<FloatingBadge>` | Pill with bob animation, scroll-triggered ✓ (done) |
| `<StickyProjectCard>` | Sticky top card with image fade ✓ (done) |
| `<CounterStat>` | Number counts up on viewport enter |
| `<PricingToggle>` | Monthly/Yearly switch with animated price |
| `<FaqAccordion>` | Expand/collapse with chevron rotation |
| `<ComparisonTable>` | 3-col table, first col highlighted |
| `<TestimonialCard>` | Quote + author avatar + name + company |
| `<ServiceCard>` | `/01` numbered service with bullet list |
| `<Reveal>` | Scroll-triggered fade+slide-up HOC ✓ (done) |
| `<IntegrationGrid>` | Tool logo grid with hover effects |

---

## 8. Pixandco → Sanjaya Mapping

| Sanjaya Section | Pixandco Equivalent | Status |
|---|---|---|
| Hero (AI) | Hero (Creative Agency) | Existing |
| "Hidden Cost of Manual Work" | "Hidden cost of fragmented work" | ✓ Done |
| Our Works (3 projects) | Our work — pinned cards | ✓ Done |
| How It Works (3 steps) | How it works | ✓ Done |
| Integration logos | Tools/platforms | Todo |
| Services (4 categories) | Pixandco services | Todo |
| Why Us comparison | Pixandco vs alternatives | Todo |
| Testimonials + Stats counters | Client testimonials + metrics | Partial |
| Pricing (3 tiers) | Pixandco pricing | Existing |
| FAQ | FAQ | Existing |
| CTA Form | "Let's get started" CTA | Existing |
| Logo Marquee | Trusted clients | **Todo** |

### Priority Items to Add
1. **`<MarqueeTicker>`** — Logo marquee below hero
2. **Animated Stats Counters** — In testimonials section  
3. **Comparison Table** — "Why Us" 3-column
4. **FAQ Accordion** — With smooth height animation
5. **Integration Grid** — Tool logos section

---

## 9. Key Visual Differentiators

1. **Background**: `#010004` — near black with a *slight purple/blue tint*, NOT pure black
2. **Accent**: `#00ff51` — electric green, used sparingly on CTAs only
3. **Font**: Geist (not Inter) — very clean geometric modern sans
4. **Cards are barely lighter than bg** — `#1a1a1d` on `#010004`
5. **Borders are hairlines** — `rgba(255,255,255,0.10)` only
6. **Spring physics only** — `bounce: 0`, no easing curves for page-load animations
7. **`/ 01` numbering prefix** — Geist Mono uppercase throughout
8. **Image overlays** — `gradient from-black/45 to-transparent` on all images

---

*Reverse-engineered from sanjaya.framer.ai — Published July 14, 2026*
