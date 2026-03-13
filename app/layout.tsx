import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbard  from "@/components/navbard"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "M-Easa",
  description: "gestion des asa ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-yellow-50`}
      >
        <Navbard/>
        {children}
      </body>
    </html>
  );
}
