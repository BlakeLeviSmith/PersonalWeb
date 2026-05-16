"use client";

import Image from "next/image";
import { useState } from "react";
import type { VideoEmbed } from "@/lib/content";

type YouTubeFacadeProps = {
  video: VideoEmbed;
  className?: string;
};

/**
 * A lightweight YouTube embed. The poster frame shows until the viewer clicks
 * play — only then does the YouTube iframe load, so no third-party script runs
 * on first paint (keeps the spec's no-third-party-scripts rule intact).
 */
export function YouTubeFacade({ video, className }: YouTubeFacadeProps) {
  const [active, setActive] = useState(false);
  const [w, h] = video.aspectRatio
    .split("/")
    .map((n) => parseInt(n.trim(), 10) || 1);

  return (
    <div
      className={`relative overflow-hidden border border-sand bg-contrast ${
        className ?? ""
      }`}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={video.label}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play: ${video.label}`}
          className="group absolute inset-0 h-full w-full"
        >
          <Image
            src={video.poster}
            alt={video.label}
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover [filter:saturate(0.92)]"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-contrast/15 transition-colors duration-300 group-hover:bg-contrast/[0.04]"
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-canvas/95 shadow-sm transition-transform duration-300 ease-out-soft group-hover:scale-105"
          >
            <svg width="22" height="26" viewBox="0 0 22 26" className="ml-1.5">
              <path d="M0 0 L22 13 L0 26 Z" fill="#1F1B16" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
