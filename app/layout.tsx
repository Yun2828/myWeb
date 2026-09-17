import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yun Waddy Yoo — Computer Science Portfolio",
  description: "The professional portfolio of Yun Waddy Yoo.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
