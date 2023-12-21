import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import Layout from "@/features/layout/layout";

const work_sans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Repair Find",
  description: "Red Seal Finder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={work_sans.className}>{children}</body>
    </html>
  );
}
