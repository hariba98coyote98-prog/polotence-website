import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CursorGlow } from "@/components/effects/cursor-glow";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://polotence.vercel.app"),
  title: {
    default: "POLOTENCE — 4 полотенца на неделю тренировок",
    template: "%s — POLOTENCE",
  },
  description:
    "Спортивные полотенца из микрофибры. 4 шт в комплекте · 80×40 см · впитывает в 5× эффективнее хлопка · сохнет за 30 минут · антибактериальная микрофибра. 1799 ₽.",
  keywords: [
    "полотенце спортивное",
    "полотенце микрофибра",
    "POLOTENCE",
    "полотенце 4 шт",
    "полотенце для зала",
    "полотенце антибактериальное",
    "полотенце 80x40",
    "полотенце быстросохнущее",
  ],
  authors: [{ name: "POLOTENCE" }],
  creator: "POLOTENCE",
  publisher: "ИП Кюльмялуома Э.А.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://polotence.vercel.app",
    siteName: "POLOTENCE",
    title: "POLOTENCE — 4 полотенца на неделю тренировок",
    description:
      "Спортивные полотенца из микрофибры. 4 шт · 80×40 см · впитывает 5× · сохнет 30 мин. 1799 ₽",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "POLOTENCE — спортивные полотенца микрофибра 4 шт",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "POLOTENCE — 4 полотенца на неделю тренировок",
    description:
      "Спортивные полотенца микрофибра 4 шт · 80×40 см · впитывает 5× · сохнет 30 мин",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <div className="grain-overlay" aria-hidden="true" />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
