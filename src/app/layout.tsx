import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import "swiper/css";
import { NavigationMenuDemo } from "@/components/common/Navbar";
import Footer from "@/components/common/footer";
import VersionBanner from "@/components/common/VersionBanner";
import Image from "next/image";
import bg from "@/assets/gradient.png";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jhingalala - Watch TV Shows & Movies Online",
  description: "Watch all movies and webseries for free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black`}>
        <Toaster />
        <div>
          <Image
            unoptimized
            src={bg}
            alt="bg"
            className="w-screen blur-lg h-screen fixed top-0 left-0 right-0 bottom-0 -z-20 opacity-40"
          />
        </div>
        <NavigationMenuDemo />
        {children}
        <Footer />
        <VersionBanner />
      </body>
      <GoogleAnalytics gaId="G-TCLGGKQDZK" />
    </html>
  );
}
