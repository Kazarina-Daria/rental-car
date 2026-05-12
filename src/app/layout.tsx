import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import css from "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rental Car",
  description: "Service for renting cars",
};

export default function RootLayout({
  children,
}: Readonly<{
  Header: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
