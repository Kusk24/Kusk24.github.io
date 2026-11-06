"use client";
import { useEffect } from "react";

/**
 * Content that loads late (the live GitHub list) makes the page taller after
 * the browser has already scrolled to a #section link, leaving it short of the
 * target. This re-aligns on each height change until the visitor takes over.
 */
export default function KeepHashInView() {
  useEffect(() => {
    let stop = () => {};

    const follow = () => {
      stop();
      const id = decodeURIComponent(location.hash.slice(1));
      const target = id && document.getElementById(id);
      if (!target) return;

      let height = document.body.scrollHeight;
      const observer = new ResizeObserver(() => {
        if (document.body.scrollHeight === height) return;
        height = document.body.scrollHeight;
        target.scrollIntoView({ behavior: "instant", block: "start" });
      });
      observer.observe(document.body);

      const events = ["wheel", "touchstart", "keydown", "pointerdown"];
      const timeout = setTimeout(() => stop(), 8000);
      stop = () => {
        clearTimeout(timeout);
        observer.disconnect();
        events.forEach((e) => window.removeEventListener(e, stop));
        stop = () => {};
      };
      events.forEach((e) =>
        window.addEventListener(e, stop, { passive: true }),
      );
    };

    follow();
    window.addEventListener("hashchange", follow);
    return () => {
      window.removeEventListener("hashchange", follow);
      stop();
    };
  }, []);

  return null;
}
