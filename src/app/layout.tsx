import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";



const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gorilapp | App de Culturismo y Tracker de Entrenamiento",
  description: "Gorilapp es el ecosistema de registro para atletas de alto rendimiento. Rastrea tu sobrecarga progresiva, audita tus PRs y entrena sin distracciones.",
  keywords: ["app de culturismo", "tracker de entrenamiento", "registro de gimnasio", "sobrecarga progresiva", "app para levantar pesas", "fitness sin redes sociales", "seguimiento de 1RM"],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/fav.png",
  },

  openGraph: {
    title: "Gorilapp | App de Culturismo y Tracker de Entrenamiento",
    description: "Rastrea tu sobrecarga progresiva y audita tus PRs sin distracciones. Progress without audience.",
    images: ["/logo.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gorilapp | Tracker de Entrenamiento",
    description: "Progress without audience. El estándar de hierro para atletas de alto rendimiento.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Gorilapp",
    "operatingSystem": "iOS, Android, Web",
    "applicationCategory": "HealthApplication, FitnessApplication",
    "description": "Gorilapp es una aplicación de seguimiento de entrenamiento diseñada exclusivamente para atletas de alto rendimiento. Sobrecarga progresiva y disciplina sin distracciones.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <html
      lang="es"
      className={`${inter.variable} ${oswald.variable} h-full antialiased dark`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="min-h-full bg-black text-brand-text font-sans selection:bg-brand-primary selection:text-black overflow-x-hidden">
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>


    </html>
  );
}



