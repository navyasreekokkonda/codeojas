"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password) {
      alert("Fill all fields");
      return;
    }

    localStorage.setItem("loggedIn", "true");
    router.push("/language");
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-6">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 opacity-20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 opacity-20 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md backdrop-blur-lg bg-white/5 border border-white/10 p-10 rounded-2xl shadow-lg">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-8">
          Join <span className="text-orange-500">CodeOjas</span>
        </h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 mb-4 bg-black border border-white/10 rounded-lg focus:border-orange-500 outline-none text-gray-200"
          onChange={(e) => setName(e.target.value)}
        />

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

        {/* Button */}
        <button
          onClick={handleSignup}
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
          🚀 Create Account
        </button>

        {/* Login */}
        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-orange-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}