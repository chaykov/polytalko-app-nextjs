"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import React from "react";

export default function UserProvider() {
  const { user, isSignedIn } = useUser();

  const saveUser = useMutation(api.mutations.users.createNewUser);
  const existingUser = useQuery(api.queries.users.getUserById, {
    userId: user?.id || "",
  });

  React.useEffect(() => {
    if (!isSignedIn || !user || existingUser === undefined) return;

    if (existingUser === null) {
      console.log("Zapisany user saveUser");
      saveUser({
        userId: user?.id,
        name: user.fullName || "Anonim",
        email: user.primaryEmailAddress?.emailAddress || "",
        // isOnline: true,
        // sessionId,
      });
    }
  }, [user, saveUser, isSignedIn, existingUser]);

  return null;
}
