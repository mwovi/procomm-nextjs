import type { Metadata } from "next";
import { Poppins, Jura } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
});

const jura = Jura({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jura"
});

export const metadata: Metadata = {
  title: "ProComm Media - Strategic Communication & Media Coordination",
  description: "ProComm Media is strategically placed to support individuals and organizations through strategic communication, training, knowledge management, and development support.",
  keywords: ["strategic communication", "media coordination", "training", "knowledge management", "public speaking", "resilience building"],
  authors: [{ name: "ProComm Media" }],
  openGraph: {
    title: "ProComm Media - Strategic Communication & Media Coordination",
    description: "Professional communication services, training, and media coordination solutions.",
    url: "https://procomm.com",
    siteName: "ProComm Media",
    images: [
      {
        url: "/images/pcm-logo.jpg",
        width: 1200,
        height: 630,
        alt: "ProComm Media",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProComm Media - Strategic Communication & Media Coordination",
    description: "Professional communication services, training, and media coordination solutions.",
    images: ["/images/pcm-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${jura.variable}`}>
      <head>
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link rel="manifest" href="/images/site.webmanifest" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
