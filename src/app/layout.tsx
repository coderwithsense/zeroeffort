import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Lexend, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const lexend = Lexend({
  variable: "--font-geist-lexend",
  subsets: ["latin"]
});

const dmSans = DM_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "ZeroEffort",
  description: "AI to automate your life",
  icons: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${lexend.variable} ${dmSans.variable} antialiased overflow-x-hidden`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
