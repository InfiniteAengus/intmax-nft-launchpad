import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/layouts/Header";
import { headers } from "next/headers";

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Providers from "./provider";
import ProgressBar from "@/components/ProgressBar";

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
  const cookie = headers().get("cookie");
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Providers cookie={cookie}>
          <ProgressBar />
          <Header />
          <main className='min-h-screen pt-32 pb-16 md:pt-20 md:pb-8'>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
