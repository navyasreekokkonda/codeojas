"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isLogged = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(isLogged);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-extrabold mb-4 text-indigo-400">
        CodeOjas
      </h1>

      <p className="text-gray-400 text-center max-w-xl mb-10">
        Practice DSA intelligently with AI guidance.
      </p>

      {!loggedIn ? (
        <div className="flex gap-4">
          <Link
            href="/login"
            className="bg-indigo-600 px-6 py-3 rounded-lg font-semibold"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="border border-indigo-500 px-6 py-3 rounded-lg font-semibold"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-gray-900 p-6 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">
              👋 Welcome back, Coder!
            </h2>

            <Link
              href="/language"
              className="bg-green-600 px-6 py-3 rounded-lg font-semibold inline-block"
            >
              Continue Coding →
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 text-red-400 underline"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}