"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          CodeOjas
        </Link>

        <div className="flex gap-6 text-gray-300">
          <Link href="/features">Features</Link>
          <Link href="/demo">Demo</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}
