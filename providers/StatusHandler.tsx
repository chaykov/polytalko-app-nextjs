"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect, useState, useRef } from "react";

export default function StatusHandler() {
  const { user, isSignedIn } = useUser();
  const setUserStatus = useMutation(api.mutations.users.setUserStatus);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isSignedIn || !user?.id) return;

    // 🔥 Jeśli to pierwsze uruchomienie, nie zmieniamy statusu z "away" na "online"
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setUserStatus({ clerkId: user.id, status: "online" });
    }

    // 🔥 Obsługa zamknięcia strony – ustawiamy "offline"
    const handleUnload = () =>
      setUserStatus({ clerkId: user.id, status: "offline" });
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [isSignedIn, user?.id]);

  return null;
}
