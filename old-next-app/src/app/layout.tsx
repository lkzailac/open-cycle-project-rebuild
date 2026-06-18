import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import AuthInitializer from "@/providers/AuthInitializer";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Open/ /Cycle/ /Project",
  description:
    "A dashboard which encourages companies to share their carbon footprints and consumers to consume consciously.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/mhi8sof.css" />
        <link
          rel="icon"
          type="image/svg"
          href="https://res.cloudinary.com/dbu0tmeuc/image/upload/v1623251921/openCycleProject/favicon3_iavn3c.svg"
        />
      </head>
      <body>
        <QueryProvider>
          <AuthInitializer />
          <NavBar />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
