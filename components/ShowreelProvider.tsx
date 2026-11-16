"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { site } from "@/lib/content";
import { track } from "@/lib/analytics";

export type Film = {
  src: string;
  poster?: string;
  title: string;
  subtitle?: string;
  note?: string;
};

type FilmContextValue = {
  open: () => void;
  openFilm: (film: Film) => void;
};

const FilmContext = createContext<FilmContextValue | null>(null);

export function useShowreel() {
  const context = useContext(FilmContext);
  if (!context) {
    throw new Error("useShowreel must be used inside ShowreelProvider");
  }
  return context;
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function ShowreelProvider({ children }: { children: ReactNode }) {
  const [film, setFilm] = useState<Film | null>(null);
  const [muted, setMuted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const isOpen = film !== null;

  const open = useCallback(() => {
    lastFocused.current = document.activeElement as HTMLElement;
    setFilm({
      src: site.showreel.src,
      poster: site.showreel.poster,
      title: site.showreel.title,
      subtitle: site.showreel.tagline,
      note: `${site.showreel.duration} · ${site.showreel.note}`,
    });
    track("showreel_play", { location: "modal" });
  }, []);

  const openFilm = useCallback((next: Film) => {
    lastFocused.current = document.activeElement as HTMLElement;
    setFilm(next);
    track("video_play", { video: next.title, location: "portfolio_modal" });
  }, []);

  const close = useCallback(() => {
    setFilm(null);
    videoRef.current?.pause();
    lastFocused.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => closeRef.current?.focus(), 60);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, video[controls], [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const goFullscreen = async () => {
    const node = videoRef.current?.parentElement;
    if (!node) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await node.requestFullscreen();
      }
    } catch {
      /* fullscreen may be blocked — ignore */
    }
  };

  return (
    <FilmContext.Provider value={{ open, openFilm }}>
      {children}

      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-500 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={film ? `${film.title} — film player` : "Film player"}
          className="flex h-full w-full flex-col bg-ink/97 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-8">
            <div className="flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="truncate font-mono text-[0.62rem] uppercase tracking-[0.24em] text-bone">
                {film?.title}
              </span>
              {film?.subtitle && (
                <span className="hidden truncate font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted sm:inline">
                  {film.subtitle}
                </span>
              )}
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close film"
              className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-bone transition-colors hover:border-gold hover:text-gold"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center overflow-hidden p-3 md:p-8">
            <div className="relative w-full max-w-6xl bg-black shadow-[0_40px_120px_rgba(0,0,0,0.7)]">
              <video
                ref={videoRef}
                key={film?.src ?? "empty"}
                className="aspect-video w-full"
                src={film?.src}
                poster={film?.poster}
                controls
                playsInline
                autoPlay={isOpen}
                muted={muted}
                preload="none"
              >
                Your browser does not support embedded video.
              </video>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-4 md:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleMute}
                className="btn btn-outline !py-2.5"
                aria-pressed={!muted}
              >
                {muted ? "Unmute" : "Mute"}
              </button>
              <button
                type="button"
                onClick={goFullscreen}
                className="btn btn-outline !py-2.5"
              >
                Fullscreen
              </button>
            </div>
            <p className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-muted">
              {film?.note}
            </p>
          </div>
        </div>
      </div>
    </FilmContext.Provider>
  );
}
