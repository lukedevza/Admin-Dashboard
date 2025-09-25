// Import global styles and fonts
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${inter.className} dark`}
    >
      <body className="w-full h-full min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
            <p className="text-gray-400">This page does not exist.</p>
            <Button
              asChild
              className="my-4"
            >
              <Link href={"/dashboard"}>Return to dashboard</Link>
            </Button>
          </div>
          <Image
            src={"/404.svg"}
            alt="404 page not found"
            width={450}
            height={450}
          />
        </div>
      </body>
    </html>
  );
}
