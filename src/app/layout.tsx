import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../../styled-system/styles.css";
import { HubotSans, Prototype } from "@/fonts.styles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Terraforming Mars+",
  description: "Score tracker for the boardgame Terraforming Mars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${HubotSans.variable} ${Prototype.variable}`}
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
