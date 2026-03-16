import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";

const poppins = Poppins({
  subsets: ["latin"],
  variable: '--font-poppins',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: "StaffCo - Team Dashboard",
  description: "AI-powered team performance monitoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <div className="flex h-screen bg-bg-tertiary">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopBar />
            <main className="flex-1 overflow-y-auto bg-bg-tertiary">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
