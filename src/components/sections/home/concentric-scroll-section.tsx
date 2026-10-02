"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react"
import { Reveal } from "@/components/motion/reveal";

// --- REUSABLE COMPONENTS ---

export function ConcentricRings({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Map scroll progress to fade rings out at the very end smoothly so they remain clearly visible
  const ringOpacity = useTransform(scrollYProgress, [0, 0.95, 1], [1, 1, 0]);

  const Ring = ({ sizeClasses, duration, reverse = false, delay = 0, initialRotate = 0 }: { sizeClasses: string, duration: number, reverse?: boolean, delay?: number, initialRotate?: number }) => (
    <div className={`absolute flex items-center justify-center ${sizeClasses} rounded-full`}>
      <motion.div
        initial={{ rotate: initialRotate }}
        animate={{ rotate: initialRotate + (reverse ? -360 : 360) }}
        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
        className="absolute inset-[-1px] rounded-full pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, transparent 60%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.8) 100%)`,
          WebkitMaskImage: `radial-gradient(circle closest-side, transparent calc(100% - 2px), black calc(100%))`,
          maskImage: `radial-gradient(circle closest-side, transparent calc(100% - 2px), black calc(100%))`
        }}
      />
    </div>
  );

  return (
    <motion.div
      style={{ opacity: ringOpacity }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <Ring sizeClasses="h-[230px] w-[230px] md:h-[410px] md:w-[410px] lg:h-[560px] lg:w-[560px]" duration={15} initialRotate={0} />
      <Ring sizeClasses="h-[390px] w-[390px] md:h-[610px] md:w-[610px] lg:h-[820px] lg:w-[820px]" duration={25} reverse delay={-5} initialRotate={120} />
      <Ring sizeClasses="h-[560px] w-[560px] md:h-[820px] md:w-[820px] lg:h-[1120px] lg:w-[1120px]" duration={35} delay={-10} initialRotate={240} />
    </motion.div>
  );
}

interface FloatingBadgeProps {
  label: string;
  position: string;
  floatDuration: number;
  triggerRange: [number, number];
  scrollYProgress: MotionValue<number>;
}

export function FloatingBadge({ label, position, floatDuration, triggerRange, scrollYProgress }: FloatingBadgeProps) {
  const rawOpacity = useTransform(scrollYProgress, triggerRange, [0, 1]);
  const rawScale = useTransform(scrollYProgress, triggerRange, [0.8, 1]);

  const opacity = useSpring(rawOpacity, { stiffness: 60, damping: 20, mass: 0.5 });
  const scale = useSpring(rawScale, { stiffness: 60, damping: 20, mass: 0.5 });

  return (
    <motion.div
      style={{ opacity, scale }}
      className={`absolute z-10 ${position}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2.5 md:gap-3.5 rounded-[10px] border border-white/10 bg-[#161618]/90 px-3.5 py-2.5 md:px-5 md:py-3 text-[13px] md:text-base font-normal text-white/90 shadow-2xl backdrop-blur-md max-w-[210px] md:max-w-none"
      >
        <span className="size-2 rounded-[2px] bg-neutral-600 shrink-0" />
        {label}
      </motion.div>
    </motion.div>
  );
}

// --- COMBINED SECTION ---

const BADGES: (Omit<FloatingBadgeProps, "scrollYProgress"> & { id: string })[] = [
  { id: "lead-generation", label: "Low-Quality Lead Generation", position: "top-[68%] right-[5%] md:top-[48%] md:right-auto md:left-[8%]", floatDuration: 3.8, triggerRange: [0.1, 0.15] },
  { id: "wasted-resources", label: "Manual Business Processes", position: "top-[6%] left-[12%] md:top-[20%] md:left-[45%]", floatDuration: 4.8, triggerRange: [0.15, 0.2] },
  { id: "siloed-comm", label: "Disconnected Systems", position: "top-[14%] right-[5%] md:top-[44%] md:right-[8%]", floatDuration: 4.2, triggerRange: [0.2, 0.25] },
  { id: "lack-visibility", label: "Limited Operational Visibility", position: "bottom-[14%] left-[5%] md:bottom-[12%] md:left-[26%]", floatDuration: 3.5, triggerRange: [0.25, 0.3] },
  { id: "tedious-onboarding", label: "Weak Digital Presence", position: "bottom-[4%] left-[25%] md:left-auto md:bottom-[16%] md:right-[12%]", floatDuration: 4.5, triggerRange: [0.3, 0.35] },
];

export function ConcentricScrollSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} id="problems" className="relative h-[300vh] w-full bg-[#010004] text-white">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <Reveal className="z-30 max-w-xl text-center px-4 flex flex-col items-center">
          <p className="mb-4 text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em] eyebrow text-white/35">
            / BUSINESS CHALLENGES
          </p>
          <h2 className="section-title max-w-lg">
            The Problems Slowing <br /> Business Growth
          </h2>
        </Reveal>

        <ConcentricRings scrollYProgress={scrollYProgress} />

        {/* Orbiting Floating Badges */}
        {BADGES.map((badge) => (
          <FloatingBadge
            key={badge.id}
            label={badge.label}
            position={badge.position}
            floatDuration={badge.floatDuration}
            triggerRange={badge.triggerRange}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
