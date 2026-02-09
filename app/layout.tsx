import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// 🚨 LE FIX EST ICI : On importe le style RainbowKit au niveau Serveur
import '@rainbow-me/rainbowkit/styles.css'; 

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "GEMINZI PROTOCOL",
  description: "Identity Layer & Cognitive Security",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} font-sans bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
