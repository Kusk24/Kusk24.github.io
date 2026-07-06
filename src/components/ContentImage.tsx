"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ImageIcon } from "lucide-react";

/**
 * Image slot backed by a file in public/content/. While the file is missing
 * the slot shows a quiet placeholder (dashed outline + hint); the moment the
 * file exists at `src`, the image fills the slot — no code change needed.
 */
export default function ContentImage({
  src,
  alt,
  hint,
  radius = 0,
  className,
  style,
}: {
  src: string;
  alt: string;
  /** Filename hint shown in the placeholder, e.g. "portrait.jpg". */
  hint?: string;
  radius?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const [state, setState] = useState<"loading" | "ok" | "missing">("loading");
  const imgRef = useRef<HTMLImageElement>(null);

  // Handle the cached-image case where onLoad can fire before hydration.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setState("ok");
  }, []);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: radius,
        background: "var(--bg2)",
        ...style,
      }}
    >
      {state !== "ok" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            border: "1.5px dashed var(--line)",
            borderRadius: radius,
            color: "var(--text2)",
            padding: 12,
            boxSizing: "border-box",
            textAlign: "center",
          }}
        >
          <ImageIcon size={26} strokeWidth={1.6} style={{ opacity: 0.45 }} />
          {hint && (
            <span style={{ fontSize: 12, fontWeight: 500, opacity: 0.8 }}>
              {hint}
            </span>
          )}
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setState("ok")}
        onError={() => setState("missing")}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: state === "ok" ? "block" : "none",
        }}
      />
    </div>
  );
}
