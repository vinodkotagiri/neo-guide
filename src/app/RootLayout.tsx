// app/RootLayout.tsx (Client Component)
'use client';  // Mark as Client Component

import { useAppSelector } from "@/redux/hooks";
import Loader from "./components/global/Loader";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isLoading } = useAppSelector((state) => state.loader);

  return (
    <div>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {isLoading ? <Loader /> : null}
        {children}
      </div>
    </div>
  );
}
