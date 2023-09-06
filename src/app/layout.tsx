import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import "./globals.css";

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
        <header className="w-full flex mb-16">
          <Link href="/" aria-label="home" className="inline-flex mx-auto">
            <Image
              src="/logo.png"
              alt="Rick and Morty"
              width={300}
              height={200}
            />
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
