import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Extremity STS Nomogram - Cancer-Specific Death Risk Calculator",
  description:
    "Individualised prediction of 3- and 5-year cancer-specific death probability in patients with extremity soft tissue sarcoma undergoing limb-sparing surgery. Fine-Gray competing risks model. SEER 2004–2018.",
  keywords: [
    "soft tissue sarcoma", "nomogram", "competing risks",
    "cancer prognosis", "Fine-Gray", "SEER", "limb-sparing surgery",
  ],
  openGraph: {
    title: "Extremity STS Nomogram",
    description: "Competing risks prediction tool for cancer-specific death in extremity STS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-parchment font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
