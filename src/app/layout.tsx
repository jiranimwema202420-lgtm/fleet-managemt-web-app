import type { Metadata } from "next";
import { TopNav } from "@/components/top-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "FleetPulse | Fleet Management Dashboard",
  description: "Manage vehicles, drivers, routes, and maintenance in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <TopNav />
        {children}
      </body>
    </html>
  );
}
