"use client";

import { api } from "@/convex/_generated/api";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import React, { useEffect } from "react";

export default function AuthControls() {
  const { isSignedIn, isLoaded, user } = useUser();
  const createUser = useMutation(api.mutations.createUser);
  const userProfile = useQuery(
    api.queries.getUserProfile,
    isSignedIn && user ? { userId: user.id } : "skip"
  );

  useEffect(() => {
    if (isSignedIn && user && userProfile === null) {
      console.log("Creating a new user:", user.id, user.firstName);
      createUser({
        clerkId: user.id,
        name: user.firstName || "New persona",
        bio: "Empty bio",
      })
        .then(() => console.log("User created!"))
        .catch((err) => console.error("Error:", err));
    }
  }, [isSignedIn, user, userProfile, createUser]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {isSignedIn ? (
        <SignOutButton redirectUrl="/">
          <button className="bg-red-500 text-white py-2 px-4  hover:bg-red-600">
            Log out
          </button>
        </SignOutButton>
      ) : (
        <SignInButton mode="modal">
          <button className="bg-blue-500 text-white py-2 px-4  hover:bg-blue-600">
            Log in
          </button>
        </SignInButton>
      )}
    </div>
  );
}
