import { Inter } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";
import { Header } from "@/components/ui/header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "Technical tests",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="py-14">{children}</main>
      </body>
    </html>
  );
}
