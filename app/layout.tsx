import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ropona-studio-bldm.onrender.com";
const pageTitle = "Ropona Bernard | AI Video Editor & Generative AI Filmmaker";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageTitle,
    template: "%s | Ropona Bernard",
  },
  description: site.description,
  keywords: [
    "Ropona Bernard",
    "AI video editor",
    "generative AI filmmaker",
    "creative production specialist",
    "AI filmmaking",
    "AI video production",
    "product UGC",
    "commercial video production",
    "paid advertising creative",
    "video editing",
    "documentary editing",
    "Lagos video editor",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: site.name,
    title: pageTitle,
    description: site.description,
    images: [
      {
        url: "/media/hero.jpg",
        width: 2200,
        height: 1238,
        alt: "Ropona Bernard — AI Video Editor & Generative AI Filmmaker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: site.description,
    images: ["/media/hero.jpg"],
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
  themeColor: "#A08C71",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: site.name,
      alternateName: "Ropona",
      jobTitle: site.role,
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
        "AI video editing",
        "Generative filmmaking",
        "Creative production",
        "Product UGC",
        "Commercial video",
        "Paid advertising creative",
        "Documentary editing",
      ],
      sameAs: site.socials.map((social) => social.href),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: site.name,
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}.mask-line>span{transform:none !important}`}</style>
        </noscript>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[120] -translate-y-24 rounded-full border border-burgundy/20 bg-champagne px-5 py-3 font-sans text-2xs font-semibold uppercase tracking-label text-burgundy transition-transform focus:translate-y-0"
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
