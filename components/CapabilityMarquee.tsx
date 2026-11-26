const items = [
  "AI video editing",
  "Generative filmmaking",
  "Creative production",
  "Product UGC",
  "Performance creative",
  "Documentary editing",
  "Brand films",
  "Cinematic finishing",
];

export function CapabilityMarquee() {
  return (
    <div className="marquee border-y border-burgundy/15 bg-champagne/60 py-4">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {items.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center">
                <span className="mx-6 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-burgundy md:mx-9">
                  {item}
                </span>
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-burgundySoft"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
