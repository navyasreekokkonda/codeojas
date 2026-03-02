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

    // Dummy auth
    localStorage.setItem("loggedIn", "true");
    setSuccess(true);

    setTimeout(() => {
      router.push("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-400">
          Login to CodeOjas
        </h1>

        {success && (
          <div className="bg-green-600 text-center p-2 rounded mb-4">
            ✅ Login Successful
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-800 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-gray-800 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg font-semibold"
        >
          Login
        </button>

        <p className="mt-6 text-center text-gray-400">
          New here?{" "}
          <Link href="/signup" className="text-indigo-400">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}