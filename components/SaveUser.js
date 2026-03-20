"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function SaveUser() {
  const { user } = useUser(); // ✅ get user from Clerk

  useEffect(() => {
    if (!user) return; // ✅ prevent error

    console.log("User:", user); // ✅ SAFE here

    const saveUser = async () => {
      await setDoc(doc(db, "users", user.id), {
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        image: user.imageUrl,
        createdAt: new Date(),
      });
    };

    saveUser();
  }, [user]);

  return null;
}