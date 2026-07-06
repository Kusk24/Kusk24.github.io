"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const EASE = "cubic-bezier(.2,.6,.2,1)";

/**
 * Scroll-reveal wrapper matching the prototype's data-rv mechanic: the child
 * starts translated + transparent and animates in once, when ~12% enters the
 * viewport. `delay`/`duration` are seconds; `y` is the entry offset in px.
 */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 30,
  className,
  style,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "p" | "h1" | "h2" | "h3" | "span" | "a";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      data-rv=""
      {...(shown ? { "data-rvd": "" } : {})}
      className={className}
      style={{
        opacity: 0,
        transform: `translateY(${y}px)`,
        transition: `opacity ${duration}s ${EASE} ${delay}s, transform ${duration}s ${EASE} ${delay}s`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
