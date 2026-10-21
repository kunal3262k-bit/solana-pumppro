import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PumpPro | High-Velocity Solana Trading Terminal & UX Redesign",
  description:
    "Mobile-first, safety-engineered redesign of Pump.fun on Solana. Features radial bonding curve gauges, automated Rug-Shield contract auditing, 1-thumb quick execution, and automated TP/SL exits.",
  openGraph: {
    title: "PumpPro — Solana UX Redesign Submission",
    description: "Next-generation trading experience for bonding curve memecoins on Solana.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-zinc-100 antialiased selection:bg-brand-neon selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
