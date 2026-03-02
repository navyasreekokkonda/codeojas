"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Background glow (NON-BLOCKING) */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-black to-black pointer-events-none" />

      {/* NAVBAR */}
      <nav className="relative z-20 flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold text-indigo-400">CodeOjas</h1>

        <div className="space-x-4">
          <Link href="/login">
            <button className="px-4 py-2 rounded-lg border border-gray-700 hover:border-indigo-500">
              Login
            </button>
          </Link>

          <Link href="/signup">
            <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-20 flex flex-col items-center text-center px-6 mt-20">
        <h2 className="text-5xl font-extrabold mb-6">
          Master DSA with <span className="text-indigo-500">AI Guidance</span>
        </h2>

        <p className="text-gray-400 max-w-2xl mb-10 text-lg">
          Practice topic-wise DSA problems, solve them in your favorite language,
          and let AI analyze your solution step-by-step like a real mentor.
        </p>

        {/* START CODING (NO LOGIN REQUIRED) */}
        <Link href="/language">
          <button className="px-8 py-4 text-lg rounded-xl bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer">
            🚀 Start Coding
          </button>
        </Link>
      </section>

      {/* FEATURES */}
      <section className="relative z-20 mt-24 px-10">
        <h3 className="text-3xl font-bold text-center mb-12">
          Why CodeOjas?
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="AI Code Analysis"
            desc="AI reviews your code, finds mistakes, and explains how to fix them."
          />

          <FeatureCard
            title="Topic-wise DSA"
            desc="Arrays, Strings, Trees, Graphs, DP – structured learning."
          />

          <FeatureCard
            title="Built-in Compiler"
            desc="Write and submit code directly. No setup required."
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-20 mt-32 py-8 text-center text-gray-500 text-sm">
        © 2026 CodeOjas · Learn. Code. Grow.
      </footer>
    </div>
  );
}

/* ---------- Feature Card ---------- */
function FeatureCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-indigo-500 transition">
      <h4 className="text-xl font-semibold mb-3">{title}</h4>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}