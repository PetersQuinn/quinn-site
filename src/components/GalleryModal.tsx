"use client";

import { useState } from "react";

export default function GalleryModal({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  function openImage(src: string) {
    setActiveSrc(src);
    setOpen(true);
  }

  function close() {
    setOpen(false);
    setActiveSrc(null);
  }

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        {images.map((src) => (
          <button
            key={src}
            type="button"
            onClick={() => openImage(src)}
            className="h-44 rounded-2xl border border-app text-left transition hover:shadow-md"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-label="Open image"
          />
        ))}
      </div>

      {open && activeSrc ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-app bg-app"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-app px-4 py-3">
              <div className="text-sm text-muted-foreground">Gallery</div>
              <button
                type="button"
                onClick={close}
                className="rounded-xl border border-app px-3 py-1 text-sm hover:bg-muted"
              >
                Close
              </button>
            </div>

            <div className="p-3">
              <img
                src={activeSrc}
                alt=""
                className="max-h-[80vh] w-full rounded-xl object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
