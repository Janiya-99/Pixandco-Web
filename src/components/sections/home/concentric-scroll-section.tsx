"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

// --- REUSABLE COMPONENTS ---

export function ConcentricRings() {
  const Ring = ({ sizeClasses, duration, reverse = false, delay = 0, initialRotate = 0 }: { sizeClasses: string, duration: number, reverse?: boolean, delay?: number, initialRotate?: number }) => (
    <div className={`absolute ${sizeClasses} rounded-full border border-white/10`}>
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
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <Ring sizeClasses="h-[230px] w-[230px] md:h-[410px] md:w-[410px] lg:h-[560px] lg:w-[560px]" duration={15} initialRotate={0} />
      <Ring sizeClasses="h-[390px] w-[390px] md:h-[610px] md:w-[610px] lg:h-[820px] lg:w-[820px]" duration={25} reverse delay={-5} initialRotate={120} />
      <Ring sizeClasses="h-[560px] w-[560px] md:h-[820px] md:w-[820px] lg:h-[1120px] lg:w-[1120px]" duration={35} delay={-10} initialRotate={240} />
    </div>
  );
}

interface FloatingBadgeProps {
  label: string;
  position: string;
  floatDuration: number;
}

export function FloatingBadge({ label, position, floatDuration }: FloatingBadgeProps) {
  return (
    <div className={`absolute z-20 ${position}`}>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-[#1a1a1d] px-4 py-2.5 text-[13px] font-medium text-white/90 shadow-xl"
      >
        <span className="size-1.5 rounded-[2px] bg-neutral-500" />
        {label}
      </motion.div>
    </div>
  );
}

// --- COMBINED SECTION ---

const BADGES = [
  { id: "wasted-resources", label: "Wasted Resources", position: "top-[32%] right-[18%]", floatDuration: 4.2 },
  { id: "siloed-comm", label: "Siloed Communication", position: "bottom-[32%] left-[22%]", floatDuration: 3.5 },
  { id: "lack-visibility", label: "Lack of Visibility", position: "top-[20%] left-[45%]", floatDuration: 4.8 },
  { id: "tedious-onboarding", label: "Tedious Onboarding", position: "top-[42%] left-[12%]", floatDuration: 3.8 },
  { id: "fragmented-workflows", label: "Fragmented Workflows", position: "bottom-[24%] right-[16%]", floatDuration: 4.5 },
];

export function ConcentricScrollSection() {
  return (
    <section id="problems" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#010004] text-white py-32">
      <Reveal className="z-10 max-w-xl text-center px-4 flex flex-col items-center">
        <p className="mb-4 text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em] eyebrow text-white/35">
          / THE OPERATIONAL GAP
        </p>
        <h2 className="section-title max-w-lg">
          The Hidden Cost <br /> of Manual Work
        </h2>
      </Reveal>

      <ConcentricRings />

      {/* Orbiting Floating Badges */}
      {BADGES.map((badge) => (
        <FloatingBadge
          key={badge.id}
          label={badge.label}
          position={badge.position}
          floatDuration={badge.floatDuration}
        />
      ))}
    </section>
  );
}
