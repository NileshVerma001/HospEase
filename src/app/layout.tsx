import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/menue/AppContext";
import Header from "@/components/layout/Header";
import { LocationProvider } from "@/components/menue/LocationContext";
const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="max-w mx-auto p-4">
          <AppProvider>
            <LocationProvider>
            <Header/>
            {children}
            <footer className="border-t p-8 text-center text-gray-500 mt-16">
              &copy; 2024 All rights reserved
            </footer>
            </LocationProvider>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
