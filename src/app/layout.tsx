import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FIRMOS | Company Brain",
  description: "Governance layer and agent council dashboard"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
