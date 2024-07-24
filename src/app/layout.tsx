import type { Metadata } from "next";
import Image from "next/image"
import { Roboto } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/menue/AppContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LocationProvider } from "@/components/menue/LocationContext";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });
export const metadata: Metadata = {
  title: "HospEase",
  description: "Advanced Hospital Locator",
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
              <Toaster/>
            <Header/>
              <br /><hr /><br />
            {children}
            <Footer />            
            </LocationProvider>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
