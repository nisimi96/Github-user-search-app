import type { Metadata } from "next";
import "./globals.css";
import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({
  weight: ['400', '700'], // Choose the font weights you need
  subsets: ['latin'], // Include subsets for your language
  fallback: ['monospace'], // Fallback fonts
});

export const metadata: Metadata = {
  title: "GitHub User Search",
  description: "GitHub User Search, a simple app to search for GitHub users and view their repositories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.className} h-full min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
