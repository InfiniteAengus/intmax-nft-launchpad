import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/layouts/Header";

import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "NFT Launchpad",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Header />
        <main className='min-h-screen py-32 md:py-20'>{children}</main>
      </body>
    </html>
  );
}
