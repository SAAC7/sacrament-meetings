import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Configurando la fuente de Google
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sacrament Meeting Planner',
  description: 'Sacramental Meeting Planner for Ward Leaders',
  icons: {
    "icon": "/logo.svg",
    "shortcut": "/logo.svg"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 text-gray-900`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}