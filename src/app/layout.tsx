import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://gorilapp.com'),
  title: 'Gorilapp | El Ecosistema de Registro de Culturismo Definitivo',
  description: 'Progresa sin audiencia. El ecosistema de registro definitivo para atletas que basan su crecimiento en datos empíricos y sobrecarga progresiva en el gimnasio.',
  keywords: ['registro de entrenamiento', 'gym log', 'culturismo', 'musculación', 'bitácora de pesas', 'hipertrofia', 'sobrecarga progresiva', 'app de gimnasio'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Gorilapp | Progresa sin audiencia',
    description: 'El ecosistema de registro definitivo para atletas que basan su crecimiento en datos empíricos.',
    url: 'https://gorilapp.com',
    siteName: 'Gorilapp',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gorilapp | Culturismo sin tonterías',
    description: 'Registro de entrenamiento serio para atletas de alto rendimiento.',
    creator: '@gorilapp',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
