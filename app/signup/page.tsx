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

    // Dummy signup success
    localStorage.setItem("loggedIn", "true");
    router.push("/language");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-400">
          Join CodeOjas
        </h1>

        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 mb-4 bg-gray-800 rounded-lg outline-none"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-800 rounded-lg outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-gray-800 rounded-lg outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg font-semibold"
        >
          Create Account
        </button>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}