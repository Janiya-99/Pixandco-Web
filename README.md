# Pixandco Web (Northline Systems)

A modern, high-performance editorial web platform and digital experience built with Next.js App Router, React 19, TypeScript, Tailwind CSS, Motion, GSAP, and Lenis smooth scrolling.

---

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, Webpack build)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type checking)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS
- **Animations & Effects**:
  - [Motion](https://motion.dev/) (Framer Motion)
  - [GSAP](https://greensock.com/gsap/) with `@gsap/react`
  - [Lenis](https://lenis.darkroom.engineering/) (Smooth scrolling)
- **UI & Components**:
  - Radix UI Primitives (`@radix-ui/react-accordion`)
  - [Lucide Icons](https://lucide.dev/)
  - `class-variance-authority` (CVA) & `clsx` / `tailwind-merge`
- **Validation**: [Zod](https://zod.dev/)
- **Process & Deployment**: Docker / PM2 & Nginx Reverse Proxy with Let's Encrypt SSL

---

## 📁 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy-staging.yml       # GitHub Actions CI/CD pipeline
├── public/
│   ├── images/                      # Static brand and project imagery
│   └── videos/                      # Video assets for hero and features
├── src/
│   ├── app/                         # Next.js App Router routes & pages
│   │   ├── about/                   # About page
│   │   ├── api/                     # API route handlers (contact, etc.)
│   │   ├── blog/                    # Editorial / blog articles & details
│   │   ├── contact/                 # Contact form & inquiry page
│   │   ├── privacy/                 # Privacy Policy
│   │   ├── projects/                # Project case studies & showcase
│   │   ├── terms/                   # Terms of Service
│   │   ├── globals.css              # Global design tokens and styles
│   │   ├── layout.tsx               # Root layout, fonts, and smooth scroll provider
│   │   └── page.tsx                 # Homepage
│   ├── components/                  # Reusable UI component library
│   │   ├── blog/                    # Blog cards and reading layouts
│   │   ├── layout/                  # Navigation bar, header, and footer
│   │   ├── media/                   # Video players and interactive media
│   │   ├── motion/                  # Animation wrappers & scroll transitions
│   │   ├── projects/                # Showcase grids and detail widgets
│   │   ├── sections/                # Full landing page sections (Hero, Features, etc.)
│   │   └── ui/                      # Base buttons, dialogs, inputs, accordions
│   ├── content/                     # Data feeds, articles, and site content
│   ├── lib/                         # Utilities, helpers, and animation setups
│   └── types/                       # Shared TypeScript definitions
├── next.config.ts                   # Next.js configuration
├── package.json                     # Scripts and dependencies
└── tsconfig.json                    # TypeScript compiler options
```

---

## 🛠️ Getting Started Locally

### 1. Prerequisites
- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **Package Manager**: `npm` (comes with Node.js)

### 2. Installation
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build & Type Checking
```bash
# Type check without emitting files
npm run typecheck

# Production build
npm run build

# Start production server
npm run start
```

---

## 🔄 CI/CD & Deployment

- Automated staging deployments are triggered on every push to the `main` (or designated staging) branch via GitHub Actions (`.github/workflows/deploy-staging.yml`).
- Deployed on VPS under PM2 process management with Nginx reverse proxy and automated SSL certificates via Let's Encrypt / Nginx Proxy Manager.
