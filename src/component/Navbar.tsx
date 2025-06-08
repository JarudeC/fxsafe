"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from '../context/AuthContext'; // We'll create this context later

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64; // 16 * 4 = 64px (h-16)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-white text-xl font-bold">
              FXSafe
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => scrollToSection('overview')}
                className="text-white/60 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Overview
              </button>
              <button
                onClick={() => scrollToSection('transactions')}
                className="text-white/60 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Transactions
              </button>
              <button
                onClick={() => scrollToSection('send-money')}
                className="text-white/60 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Send Money
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-white/80 text-sm">
                    Welcome back, {user?.name || 'User'}
                  </span>
                  <button
                    onClick={logout}
                    className="text-white/60 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="text-white/60 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-gradient-to-r from-[#00C9A7] to-[#007BFF] hover:opacity-90 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}