import type { Metadata } from "next";
import "./globals.css";
import { funnelDisplay } from "./fonts";

export const metadata: Metadata = {
  title: "Code Monkey",
  description: "A website that helps you prep for coding interview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${funnelDisplay.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
