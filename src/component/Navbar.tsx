"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent text-white px-6 py-4 border-b border-white/20 backdrop-blur-md">
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        {/* Left: Logo with circular background */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-md">
            <Image
              src="/fxsafe_logo.png"
              alt="TicketGuard Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <span className="font-bold text-xl tracking-wide">FXSafe</span>
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
          <a href="#" className="hover:text-gray-300 transition">Home</a>
          <a href="#" className="hover:text-gray-300 transition">About</a>
          <a href="#" className="hover:text-gray-300 transition">Events</a>
          <a href="#" className="hover:text-gray-300 transition">Blogs</a>
          <a href="#" className="hover:text-gray-300 transition">Contact</a>
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex gap-4 items-center text-sm font-medium">
          <button className="hover:text-gray-300 transition">Log In</button>
          <button className="border border-white px-4 py-1.5 rounded-md hover:bg-white hover:text-black transition">
            Sign Up ↗
          </button>
        </div>
      </div>
    </nav>
  );
}