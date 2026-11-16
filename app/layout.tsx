import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { ShowreelProvider } from "@/components/ShowreelProvider";
import { site, about } from "@/lib/content";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ropona.studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ropona Benard — Creative Director, AI Filmmaker & Video Editor",
    template: "%s — Ropona Benard",
  },
  description: site.description,
  keywords: [
    "Ropona Benard",
    "Ropona",
    "AI filmmaker",
    "creative director",
    "AI film production",
    "video editor",
    "cinematic editing",
    "brand films",
    "commercials",
    "AI commercials",
    "storytelling",
    "Lagos creative director",
    "Nigeria filmmaker",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Ropona Studio",
    title: "Ropona Benard — Creative Director, AI Filmmaker & Video Editor",
    description: site.tagline + " " + site.description,
    images: [
      {
        url: "/media/og.jpg",
        width: 1200,
        height: 630,
        alt: "Ropona Benard — cinematic AI filmmaking and professional video editing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ropona Benard — Creative Director, AI Filmmaker & Video Editor",
    description: site.tagline,
    images: ["/media/og.jpg"],
    creator: "@ropona",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg" }],
  },
  category: "creative services",
};

export const viewport: Viewport = {
  themeColor: "#211a15",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: site.name,
      alternateName: "Ropona",
      jobTitle: "Creative Director, AI Filmmaker & Video Editor",
      description: site.description,
      url: siteUrl,
      image: `${siteUrl}${about.portrait}`,
      email: `mailto:${site.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "NG",
      },
      knowsAbout: [
        "AI filmmaking",
        "Video editing",
        "Creative direction",
        "Storytelling",
        "Commercial production",
        "Colour grading",
      ],
      sameAs: site.socials.map((social) => social.href),
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#studio`,
      name: "Ropona Studio",
      description: site.description,
      url: siteUrl,
      email: site.email,
      areaServed: ["US", "GB", "CA", "AU", "AE", "NG"],
      founder: { "@id": `${siteUrl}/#person` },
      serviceType: [
        "AI Film Production",
        "AI Commercial Production",
        "Cinematic Video Editing",
        "Creative Direction",
      ],
      priceRange: "$$$",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Ropona Studio",
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}.mask-line>span{transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="font-sans">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[120] -translate-y-24 bg-bone px-4 py-3 font-mono text-2xs uppercase tracking-label text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <ShowreelProvider>
          <Header />
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer />
        </ShowreelProvider>
        <Analytics />
      </body>
    </html>
  );
}
