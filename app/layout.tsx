import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Fetch Poppins font
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // optional: include weights you need
});

export const metadata: Metadata = {
  title: "Arowolo Mutmahinat | Front-End & Smart Contract Developer",
  description: "Arowolo Mutmahinat - Front-End & Smart Contract Developer building scalable digital systems and decentralized applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
