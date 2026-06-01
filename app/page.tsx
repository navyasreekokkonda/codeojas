"use client";

import {
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <SignInButton mode="modal">
        <button>Login</button>
      </SignInButton>

      <SignUpButton mode="modal">
        <button>Register</button>
      </SignUpButton>

      <UserButton />
    </div>
  );
}