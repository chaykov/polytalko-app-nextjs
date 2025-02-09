"use client";

import { api } from "@/convex/_generated/api";
import { useAuth, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";

export default function UserProvider() {
  const { isSignedIn, user } = useUser();
  const { sessionId } = useAuth();

  const saveUser = useMutation(api.mutations.saveUser);

  useEffect(() => {
    if (isSignedIn && user && sessionId) {
      saveUser({
        userId: user.id,
        name: user.fullName || "Anonim",
        email: user.primaryEmailAddress?.emailAddress || "",
        isOnline: true,
        sessionId,
      });

      console.log("Zapisany user saveUser");
    }
  }, [isSignedIn, user, sessionId, saveUser]);

  return null;
}
