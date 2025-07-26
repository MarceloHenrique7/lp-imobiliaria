import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import WhatsappButton from "./components/WhatsappButton";

// Fontes principais
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: "Maison Prime Imóveis",
  description: "Imobiliária de alto padrão. Imóveis exclusivos com atendimento personalizado.",
  openGraph: {
    title: "Maison Prime Imóveis",
    description: "Imobiliária de alto padrão. Imóveis exclusivos com atendimento personalizado.",
    type: "website",
    locale: "pt_BR",
    siteName: "Maison Prime Imóveis",
  },
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#f9f6f2",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-br"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <head>
        {/* Meta tags extras para SEO e mobile */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* OGP para melhor preview em redes sociais */}
        <meta property="og:title" content="Maison Prime Imóveis" />
        <meta
          property="og:description"
          content="Imobiliária de alto padrão. Imóveis exclusivos com atendimento personalizado."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="Maison Prime Imóveis" />
        {/* Pré-carregamento das fontes para renderização mais rápida */}
        <link rel="preload" as="font" href="/fonts/PlayfairDisplay-VariableFont_wght.ttf" type="font/ttf" crossOrigin="anonymous" />
        {/* Theme color para mobile */}
        <meta name="theme-color" content="#f9f6f2" />
      </head>
      <body className="antialiased bg-[#f9f6f2]">
        {children}
        <WhatsappButton />
      </body>
    </html>
  );
}
