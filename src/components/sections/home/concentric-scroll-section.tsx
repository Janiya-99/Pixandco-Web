"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

// --- REUSABLE COMPONENTS ---

interface ScrollContainerProps {
  children: (scrollYProgress: MotionValue<number>) => ReactNode;
  height?: string;
  className?: string;
  id?: string;
}

export function ScrollContainer({ children, height = "300vh", className = "", id }: ScrollContainerProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id={id} ref={targetRef} className={`relative ${className}`} style={{ height }}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#010004]">
        {children(scrollYProgress)}
      </div>
    </section>
  );
}

export function ConcentricRings({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const ringOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.2, 1, 1, 0]);

  const Ring = ({ sizeClasses, duration, reverse = false, delay = 0, initialRotate = 0 }: { sizeClasses: string, duration: number, reverse?: boolean, delay?: number, initialRotate?: number }) => (
    <motion.div
      initial={{ rotate: initialRotate }}
      animate={{ rotate: initialRotate + (reverse ? -360 : 360) }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      className={`absolute ${sizeClasses} rounded-full`}
      style={{
        background: `conic-gradient(from 0deg, transparent 0%, transparent 60%, rgba(255,255,255,0.1) 80%, rgba(255,255,255,0.8) 100%)`,
        WebkitMaskImage: `radial-gradient(circle closest-side, transparent calc(100% - 1.5px), black calc(100% - 1px))`,
        maskImage: `radial-gradient(circle closest-side, transparent calc(100% - 1.5px), black calc(100% - 1px))`,
      }}
    />
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
  triggerRange: [number, number];
  scrollYProgress: MotionValue<number>;
  floatDuration: number;
  index: number;
}

export function FloatingBadge({ label, position, triggerRange, scrollYProgress, floatDuration }: FloatingBadgeProps) {
  const maxProgress = useRef(0);

  const getProgress = (val: number) => {
    if (val === 0) maxProgress.current = 0;
    if (val > maxProgress.current) maxProgress.current = val;
    return maxProgress.current;
  };

  const opacity = useTransform(scrollYProgress, (val) => {
    const p = getProgress(val);
    if (p <= triggerRange[0]) return 0;
    if (p >= triggerRange[1]) return 1;
    return (p - triggerRange[0]) / (triggerRange[1] - triggerRange[0]);
  });

  const y = useTransform(scrollYProgress, (val) => {
    const p = getProgress(val);
    if (p <= triggerRange[0]) return 20;
    if (p >= triggerRange[1]) return 0;
    return 20 - ((p - triggerRange[0]) / (triggerRange[1] - triggerRange[0])) * 20;
  });

  const scale = useTransform(scrollYProgress, (val) => {
    const p = getProgress(val);
    if (p <= triggerRange[0]) return 0.9;
    if (p >= triggerRange[1]) return 1;
    return 0.9 + ((p - triggerRange[0]) / (triggerRange[1] - triggerRange[0])) * 0.1;
  });

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className={`absolute z-20 ${position}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-[#1a1a1d] px-4 py-2.5 text-[13px] font-medium text-white/90 shadow-xl"
      >
        <span className="size-1.5 rounded-[2px] bg-neutral-500" />
        {label}
      </motion.div>
    </motion.div>
  );
}

// --- COMBINED SECTION ---

const BADGES = [
  { id: "wasted-resources", label: "Wasted Resources", position: "top-[32%] right-[18%]", floatDuration: 4.2, triggerRange: [0.1, 0.2] as [number, number] },
  { id: "siloed-comm", label: "Siloed Communication", position: "bottom-[32%] left-[22%]", floatDuration: 3.5, triggerRange: [0.25, 0.35] as [number, number] },
  { id: "lack-visibility", label: "Lack of Visibility", position: "top-[20%] left-[45%]", floatDuration: 4.8, triggerRange: [0.4, 0.5] as [number, number] },
  { id: "tedious-onboarding", label: "Tedious Onboarding", position: "top-[42%] left-[12%]", floatDuration: 3.8, triggerRange: [0.55, 0.65] as [number, number] },
  { id: "fragmented-workflows", label: "Fragmented Workflows", position: "bottom-[24%] right-[16%]", floatDuration: 4.5, triggerRange: [0.7, 0.8] as [number, number] },
];

export function ConcentricScrollSection() {
  return (
    <ScrollContainer id="problems" height="300vh" className="text-white">
      {(scrollYProgress) => (
        <>
          <Reveal className="z-10 max-w-xl text-center px-4 flex flex-col items-center">
            <p className="mb-4 text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em] eyebrow text-white/35">
              / THE OPERATIONAL GAP
            </p>
            <h2 className="section-title max-w-lg">
              The Hidden Cost <br /> of Manual Work
            </h2>
          </Reveal>

          <ConcentricRings scrollYProgress={scrollYProgress} />

          {/* Orbiting Floating Badges */}
          {BADGES.map((badge, index) => (
            <FloatingBadge
              key={badge.id}
              label={badge.label}
              position={badge.position}
              floatDuration={badge.floatDuration}
              index={index}
              scrollYProgress={scrollYProgress}
              triggerRange={badge.triggerRange}
            />
          ))}
        </>
      )}
    </ScrollContainer>
  );
}
