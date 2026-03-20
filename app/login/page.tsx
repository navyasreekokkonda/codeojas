"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    localStorage.setItem("loggedIn", "true");
    setSuccess(true);

    setTimeout(() => {
      router.push("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-6">

      {/* Background glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 opacity-20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 opacity-20 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md backdrop-blur-lg bg-white/5 border border-white/10 p-10 rounded-2xl shadow-lg">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-8">
          Login to <span className="text-orange-500">CodeOjas</span>
        </h1>

        {/* Success Message */}
        {success && (
          <div className="bg-green-600/20 border border-green-500 text-center p-3 rounded-lg mb-6">
            ✅ Login Successful
          </div>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-black border border-white/10 rounded-lg focus:border-orange-500 outline-none text-gray-200"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-black border border-white/10 rounded-lg focus:border-orange-500 outline-none text-gray-200"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="
          w-full
          py-3
          rounded-xl
          font-semibold
          text-white
          bg-gradient-to-r
          from-orange-500
          via-orange-400
          to-yellow-500
          shadow-lg shadow-orange-500/30
          hover:scale-105
          transition
          "
        >
          🚀 Login
        </button>

        {/* Signup */}
        <p className="mt-6 text-center text-gray-400">
          New here?{" "}
          <Link href="/signup" className="text-orange-400 hover:underline">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
}