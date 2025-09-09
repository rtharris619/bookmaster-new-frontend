'use client'

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { BookOpen, Github, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useRouter } from "next/navigation";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Bookmaster",
//   description: "A platform for managing your book collection",
// };

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
    router.push('/login');
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Bookmaster
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">
                Home
              </Link>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">About</a>
              {isLoggedIn ? (
                <button 
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>
    
      {children}
     
      <footer className="bg-gray-800 border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Bookmaster
                </h3>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Your ultimate destination for discovering amazing books. Find your next great read.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Browse Books</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Categories</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">New Releases</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Bookmaster. All rights reserved. Made with ❤️ for book lovers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <AuthProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}
