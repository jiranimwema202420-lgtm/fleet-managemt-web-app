import type { Metadata } from "next";
import { TopNav } from "@/components/top-nav";
import { FirebaseProvider } from "@/firebase/firebase-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Opulent FleetPro | Command & Control Dashboard",
  description: "High-fidelity fleet command, telemetry, and financial intelligence platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <FirebaseProvider>
          <TopNav />
          {children}
        </FirebaseProvider>
      </body>
    </html>
  );
}
