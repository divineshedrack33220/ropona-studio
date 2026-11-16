const items = [
  "AI film",
  "Commercials",
  "Cinematic editing",
  "Storytelling",
  "Creative direction",
  "Colour & finish",
  "Sound design",
  "Brand worlds",
];

export function CapabilityMarquee() {
  return (
    <div className="marquee border-b border-white/[0.08] bg-coal py-4">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {items.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center">
                <span className="mx-6 font-mono text-[0.58rem] uppercase tracking-[0.24em] text-mist md:mx-9">
                  {item}
                </span>
                <span className="h-1 w-1 rotate-45 bg-gold/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
