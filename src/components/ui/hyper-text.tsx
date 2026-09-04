"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface HyperTextProps {
  text: string;
  duration?: number;
  delay?: number;
  className?: string;
  animateOnLoad?: boolean;
  triggerAnimation?: boolean;
  showCursor?: boolean;
  onComplete?: () => void;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
const getRandomChar = () => alphabets[Math.floor(Math.random() * alphabets.length)] ?? "";

export function HyperText({
  text,
  duration = 800,
  delay = 0,
  className,
  animateOnLoad = false,
  triggerAnimation = false,
  showCursor = false,
  onComplete,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      setIsAnimating(false);
      onComplete?.();
      return;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    setIsAnimating(true);
    let iterations = 0;

    // Immediately scramble characters
    setDisplayText(
      text
        .split("")
        .map((char) => (char === " " ? " " : getRandomChar()))
        .join("")
    );

    const stepTime = 25; // 40fps smooth ticker
    const totalSteps = Math.max(15, Math.floor(duration / stepTime));
    const stepIncrement = text.length / totalSteps;

    intervalRef.current = setInterval(() => {
      if (iterations < text.length) {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index <= iterations) {
                return text[index] ?? "";
              }
              return getRandomChar();
            })
            .join("")
        );
        iterations += stepIncrement;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayText(text);
        setIsAnimating(false);
        onComplete?.();
      }
    }, stepTime);
  }, [text, duration, onComplete]);

  // Trigger on initial mount / first visit if animateOnLoad is true
  useEffect(() => {
    if (!animateOnLoad) return;

    if (delay > 0) {
      timerRef.current = setTimeout(() => {
        startAnimation();
      }, delay * 1000);
    } else {
      startAnimation();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [animateOnLoad, delay, startAnimation]);

  // Trigger when triggerAnimation prop becomes true (e.g., in view)
  useEffect(() => {
    if (!triggerAnimation) return;

    if (delay > 0) {
      timerRef.current = setTimeout(() => {
        startAnimation();
      }, delay * 1000);
    } else {
      startAnimation();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [triggerAnimation, delay, startAnimation]);

  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-pre transition-colors duration-300 select-none",
        className
      )}
      style={{
        color: isAnimating ? "#00ff51" : undefined,
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        startAnimation();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="inline-block">{displayText}</span>
      {showCursor && !isAnimating && isHovered && (
        <span className="nav-caret ml-[1ch]" aria-hidden />
      )}
    </span>
  );
}