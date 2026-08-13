# Implementation Guide: Scroll-Driven Concentric Circles & Floating Badges

This guide details how to build the exact scroll-pinned animation section from the reference video—featuring expanding concentric circles and floating dark pill badges ("Wasted Resources", "Siloed Communication", "Lack of Visibility", etc.)—in a **Next.js** project.

---

## 1. Required Packages & Resources

### npm Packages
Install Framer Motion and Lucide icons in your Next.js project:

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

| Package | Purpose |
| :--- | :--- |
| **`framer-motion`** | Handles scroll hooks (`useScroll`, `useTransform`) and smooth hardware-accelerated animations (`motion.div`). |
| **`lucide-react`** | Subtle icons for badge indicators and section UI. |
| **`clsx` & `tailwind-merge`** | Class helper utilities for responsive dynamic styling. |

---

## 2. Animation Resource & Asset Breakdown

| Element | CSS / Motion Technique |
| :--- | :--- |
| **Sticky Viewport** | Container set to `h-[300vh]`, inner viewport pinned with `sticky top-0 h-screen overflow-hidden`. |
| **Concentric Rings** | `border border-white/10` divs with `rounded-full`, scaled seamlessly from `0.5` to `1.8` using `useTransform`. |
| **Pill Badges** | Floating cards styled with `bg-neutral-900/90`, `border-neutral-800`, `backdrop-blur-md`, and bullet indicators. |
| **Staggered Reveals** | Badge opacity and vertical offset mapped to unique ranges along `scrollYProgress` (e.g. `[0.15, 0.25]`, `[0.3, 0.4]`). |

---

## 3. Next.js Implementation Code

Create a component file at `components/ConcentricScrollSection.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface BadgeItem {
  id: string;
  label: string;
  position: string;
  triggerRange: [number, number];
}

const BADGES: BadgeItem[] = [
  {
    id: "wasted-resources",
    label: "Wasted Resources",
    position: "top-[32%] right-[18%]",
    triggerRange: [0.15, 0.25],
  },
  {
    id: "siloed-comm",
    label: "Siloed Communication",
    position: "bottom-[32%] left-[22%]",
    triggerRange: [0.28, 0.38],
  },
  {
    id: "lack-visibility",
    label: "Lack of Visibility",
    position: "top-[20%] left-[45%]",
    triggerRange: [0.40, 0.50],
  },
  {
    id: "tedious-onboarding",
    label: "Tedious Onboarding",
    position: "top-[42%] left-[12%]",
    triggerRange: [0.52, 0.62],
  },
  {
    id: "fragmented-workflows",
    label: "Fragmented Workflows",
    position: "bottom-[24%] right-[16%]",
    triggerRange: [0.65, 0.75],
  },
];

export function ConcentricScrollSection() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the 300vh container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Scale and opacity transformations for outer concentric circles
  const ringScale = useTransform(scrollYProgress, [0, 0.85], [0.5, 1.8]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.2, 1, 1, 0]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black text-white">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        
        {/* Central Title */}
        <div className="z-10 max-w-xl text-center px-4 flex flex-col items-center">
          <p className="mb-4 text-xs font-mono text-neutral-500 uppercase tracking-[0.2em]">
            / THE OPERATIONAL GAP
          </p>
          <h2 className="text-4xl sm:text-6xl font-medium tracking-tight leading-tight text-neutral-100">
            The hidden cost <br /> of fragmented work
          </h2>
        </div>

        {/* Scalable Concentric Rings */}
        <motion.div
          style={{ scale: ringScale, opacity: ringOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          {/* Inner Ring */}
          <div className="absolute h-[420px] w-[420px] rounded-full border border-white/20" />
          {/* Middle Ring */}
          <div className="absolute h-[720px] w-[720px] rounded-full border border-white/10" />
          {/* Outer Ring */}
          <div className="absolute h-[1050px] w-[1050px] rounded-full border border-white/5" />
        </motion.div>

        {/* Orbiting Floating Badges */}
        {BADGES.map((badge) => (
          <FloatingBadge
            key={badge.id}
            item={badge}
            scrollYProgress={scrollYProgress}
          />
        ))}

      </div>
    </section>
  );
}

function FloatingBadge({
  item,
  scrollYProgress,
}: {
  item: BadgeItem;
  scrollYProgress: MotionValue<number>;
}) {
  // Fade in and slide up when scrolling into range
  const opacity = useTransform(scrollYProgress, item.triggerRange, [0, 1]);
  const y = useTransform(scrollYProgress, item.triggerRange, [15, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute z-20 flex items-center gap-2 rounded-full border border-neutral-700/80 bg-neutral-900/90 px-3.5 py-1.5 text-xs text-neutral-200 shadow-2xl backdrop-blur-md ${item.position}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
      <span className="font-medium">{item.label}</span>
    </motion.div>
  );
}
```

---

## 4. Usage in Next.js Page

Add the section to your `app/page.tsx`:

```tsx
import { ConcentricScrollSection } from "@/components/ConcentricScrollSection";

export default function HomePage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Preceding section */}
      <section className="h-screen flex items-center justify-center text-neutral-400">
        <p>Scroll down to reveal animation...</p>
      </section>

      {/* Concentric Circle Scroll Animation */}
      <ConcentricScrollSection />

      {/* Following section */}
      <section className="h-screen flex items-center justify-center text-neutral-400">
        <p>Next section content...</p>
      </section>
    </main>
  );
}
```
