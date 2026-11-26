"use client";

import { useEffect, useState } from "react";

/** Reads a video's real runtime from metadata so labels never go stale. */
export function useVideoDuration(src: string | undefined, fallback = "") {
  const [duration, setDuration] = useState(fallback);

  useEffect(() => {
    if (!src) return;
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;

    const onLoaded = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const minutes = Math.floor(video.duration / 60);
      const seconds = Math.floor(video.duration % 60);
      setDuration(
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.src = src;
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  return duration;
}
