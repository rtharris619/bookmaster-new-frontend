import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bookmaster",
  description: "A platform for managing your book collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <header>
            <div>Header goes here</div>
          </header>
        
          {children}

          <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
            <div>Footer goes here</div>
          </footer>
        </div>
        
      </body>
    </html>
  );
}
