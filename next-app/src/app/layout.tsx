import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Cycle Project",
  description: "Every brand's carbon footprint, made visible.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/mhi8sof.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
