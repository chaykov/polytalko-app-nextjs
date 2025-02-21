"use client";
import { useClerk } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export default function LogoutButton() {
  const { signOut, user } = useClerk();
  const setUserStatus = useMutation(api.mutations.users.setUserStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      if (user) {
        await setUserStatus({ clerkId: user.id, status: "offline" }); // 🔥 Najpierw zmieniamy status
      }
      await signOut(); // Następnie wylogowujemy użytkownika
    } catch (error) {
      console.error("Failed to logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      aria-label="Logout"
      className="bg-red-500 text-white p-2 rounded"
      disabled={isLoading}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}
