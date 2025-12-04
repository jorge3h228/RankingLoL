import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fonte sans-serif padrão
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Fonte monospace
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadados da aplicação (SEO e título de página)
export const metadata: Metadata = {
  title: "Projeto Cosmos | Ranking LoL",
  description: "Ranking Interestelar de League of Legends com tema cosmic futurista",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
