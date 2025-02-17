"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";

interface AddFriendStatusButtonProps {
  friendId: string;
}

export default function AddFriendStatusButton({
  friendId,
}: AddFriendStatusButtonProps) {
  const { user } = useUser();
  const userId = user?.id;

  // 📌 `useQuery()` ZAWSZE się wykonuje, ale może zwrócić `null`
  const relationshipStatus = useQuery(
    api.queries.friends.getFriendshipStatus,
    userId && friendId ? { userId, friendId } : "skip" // 🔥 Zamiast pomijać Hooka, przekazujemy `null`
  );

  const addFriend = useMutation(api.mutations.friends.addFriend);

  // 📌 Lokalny stan, aby natychmiast zmienić status przycisku po kliknięciu
  const [localStatus, setLocalStatus] = useState(relationshipStatus);

  const handleAddFriend = async () => {
    if (!userId) return;

    try {
      await addFriend({ userId, friendId });
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLocalStatus("pending"); // 🔄 Zmieniamy lokalnie, zanim dane wrócą z bazy
      location.reload();
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  if (relationshipStatus === "accepted") return null;

  // 📌 Jeśli status to "pending" lub "accepted", przycisk jest zablokowany
  const disabled = localStatus === "pending" || localStatus === "accepted";
  const buttonLabel = disabled ? "Request sent" : "Add friend";

  return (
    <button
      onClick={handleAddFriend}
      disabled={disabled}
      className={`px-4 py-2 text-white ${
        disabled
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {buttonLabel}
    </button>
  );
}
