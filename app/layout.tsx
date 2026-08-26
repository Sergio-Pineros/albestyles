import type { Metadata } from "next";
import { Big_Shoulders, IBM_Plex_Mono, Sora } from "next/font/google";
import { MotionProvider } from "@/components/providers/MotionProvider";
import "./globals.css";

const display = Big_Shoulders({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const body = Sora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Albe Styles — North Loop Minneapolis Barber",
  description:
    "Professional men’s haircuts, beard grooming, scissor cuts, kids cuts, and packs in North Loop Minneapolis. Book Albe at SAVRON Barbershop & Lounge.",
  metadataBase: new URL("https://albestylesbarber.com"),
  openGraph: {
    title: "Albe Styles — North Loop Minneapolis Barber",
    description:
      "Modern and classic men’s haircuts. Precision fades, tapers, scissors, and beard work.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-bone">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="grain" aria-hidden />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
