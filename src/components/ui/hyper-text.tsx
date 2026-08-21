"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface HyperTextProps {
  text: string;
  duration?: number;
  framerProps?: Variants;
  className?: string;
  animateOnLoad?: boolean;
  showCursor?: boolean;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export function HyperText({
  text,
  duration = 800,
  framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 3 },
  },
  className,
  animateOnLoad = true,
  triggerAnimation = false,
  showCursor = true,
}: HyperTextProps & { triggerAnimation?: boolean }) {
  const [displayText, setDisplayText] = useState(text.split(""));
  const [trigger, setTrigger] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const interations = useRef(0);
  const isFirstRender = useRef(true);

  const startAnimation = () => {
    interations.current = 0;
    setTrigger(true);
  };

  useEffect(() => {
    if (triggerAnimation) {
      startAnimation();
    }
  }, [triggerAnimation]);

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (!animateOnLoad && isFirstRender.current) {
          clearInterval(interval);
          isFirstRender.current = false;
          return;
        }
        if (interations.current < text.length) {
          setDisplayText((t) =>
            t.map((l, i) =>
              l === " "
                ? l
                : i <= interations.current
                  ? text[i]
                  : alphabets[getRandomInt(26)],
            ),
          );
          interations.current = interations.current + 0.1;
        } else {
          setTrigger(false);
          clearInterval(interval);
        }
      },
      duration / (text.length * 10),
    );
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [text, duration, trigger, animateOnLoad]);

  return (
    <span
      className={cn("inline-flex items-center overflow-hidden transition-colors duration-300", trigger ? "text-[#00ff51]" : "", className)}
      onMouseEnter={() => {
        setIsHovered(true);
        startAnimation();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="popLayout">
        {displayText.map((letter, i) => (
          <motion.span
            key={i}
            className={cn(letter === " " ? "w-3" : "")}
            {...framerProps}
          >
            {letter}
          </motion.span>
        ))}
      </AnimatePresence>
      {showCursor && !trigger && isHovered && (
        <span className="nav-caret ml-[1ch]" aria-hidden />
      )}
    </span>
  );
}