import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? "http://localhost:3000"),
  title: {
    default: "GymBuddy - Your AI Fitness Partner",
    template: "%s | GymBuddy"
  },
  description: "AI gym, diet, calorie, BMI, and progress planner for motivated fitness routines.",
  openGraph: {
    title: "GymBuddy",
    description: "Your AI fitness partner for workouts, diet plans, analytics, and coaching.",
    images: ["/og-image.svg"],
    type: "website"
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GymBuddy",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Script id="structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
