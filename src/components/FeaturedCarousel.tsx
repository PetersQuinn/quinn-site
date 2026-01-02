"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type Project = {
  slug: string;
  title: string;
  blurb: string;
  domain: string;
  year: number;
  coverImage?: string;
  featured?: number; // 1 = show
  featuredOrder?: number; // lower = earlier
};

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

export default function FeaturedCarousel({
  projects,
  intervalMs = 4500,
}: {
  projects: Project[];
  intervalMs?: number;
}) {
  const featured = useMemo(() => {
    return projects
      .filter((p) => (p.featured ?? 0) === 1)
      .sort(
        (a, b) => (a.featuredOrder ?? 9999) - (b.featuredOrder ?? 9999)
      );
  }, [projects]);

  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  // crossfade state
  const [fadeIn, setFadeIn] = useState(true);
  const fadeTimer = useRef<number | null>(null);
  const timer = useRef<number | null>(null);

  const count = featured.length;
  const safeIndex = clamp(i, 0, Math.max(0, count - 1));
  const active = featured[safeIndex];

  function goTo(nextIndex: number) {
    if (!count) return;

    // trigger subtle crossfade: fade out then swap then fade in
    setFadeIn(false);
    if (fadeTimer.current) window.clearTimeout(fadeTimer.current);

    fadeTimer.current = window.setTimeout(() => {
      setI((nextIndex + count) % count);
      setFadeIn(true);
    }, 140); // small fade-out window
  }

  function next() {
    goTo(safeIndex + 1);
  }

  function prev() {
    goTo(safeIndex - 1);
  }

  useEffect(() => {
    if (!count || paused) return;

    timer.current = window.setInterval(() => {
      goTo(safeIndex + 1);
    }, intervalMs);

    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, paused, intervalMs, safeIndex]);

  useEffect(() => {
    return () => {
      if (fadeTimer.current) window.clearTimeout(fadeTimer.current);
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  if (!count) return null;

  return (
    <div
      className="overflow-hidden rounded-3xl border border-app shadow-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between border-b border-app px-5 py-4">
        <div>
          <div className="text-sm font-semibold">Featured</div>
          <div className="text-xs text-muted-foreground">
            Click a project to jump into the full write-up
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            className="rounded-xl border border-app px-3 py-2 text-sm hover:bg-muted"
            aria-label="Previous featured project"
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            className="rounded-xl border border-app px-3 py-2 text-sm hover:bg-muted"
            aria-label="Next featured project"
          >
            →
          </button>
        </div>
      </div>

      {/* Slide */}
      <Link href={`/projects/${active.slug}`} className="group block">
        <div
          className={[
            "relative h-56 transition-opacity duration-300",
            fadeIn ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: active.coverImage
                ? `url(${active.coverImage})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Top-weighted overlay so text/buttons stay readable */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.78), rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.12))",
            }}
          />

          {/* ✅ Move content to the TOP (not animated) */}
          <div className="absolute inset-0 flex flex-col justify-start p-6">
            <div className="text-xs text-white/85">
              {active.domain} • {active.year}
            </div>

            <div className="mt-1 clamp-2 text-2xl font-bold leading-tight text-white">
              {active.title}
            </div>

            <div className="mt-3 clamp-2 text-sm text-white/80">
              {active.blurb}
            </div>

            <div className="mt-4 text-sm text-white/85 opacity-0 transition group-hover:opacity-100">
              Click to view →{" "}
              <span className="text-white/90">
                {safeIndex + 1}/{count}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 px-5 py-4">
        {featured.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => goTo(idx)}
            aria-label={`Go to featured project ${idx + 1}`}
            className={[
              "h-2.5 w-2.5 rounded-full border border-app transition",
              idx === safeIndex ? "bg-black" : "bg-muted",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
