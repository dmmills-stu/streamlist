import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar"
import { Toaster } from "react-hot-toast";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StreamList",
  description: "Track and manage your movies and shows.",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#872323"
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
        <div className="app-container">
          <NavBar />
          {/* Register the service worker for offline support and caching */}
          <ServiceWorkerRegister />
          <main className="main-content">{children}</main>
          <Toaster position="top-left" reverseOrder={false} />
        </div>
      </body>
    </html>
  );
}