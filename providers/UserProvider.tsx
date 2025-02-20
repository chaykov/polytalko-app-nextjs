"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import React from "react";

export default function UserProvider() {
  const { user, isSignedIn } = useUser();
  const createUser = useMutation(api.mutations.users.createUser);

  React.useEffect(() => {
    if (!isSignedIn || !user) return;

    if (user) {
      createUser({
        clerkId: user.id,
        name: user.fullName || "Anonim",
        email: user.emailAddresses[0]?.emailAddress || "",
      });
    }
  }, [user]);

  return null;
}
