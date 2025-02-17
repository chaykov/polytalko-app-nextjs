"use client";

import { api } from "@/convex/_generated/api";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";

interface AddFriendButtonStatusProps {
  friendId: string;
}

export default function AddFriendButtonStatus({
  friendId,
}: AddFriendButtonStatusProps) {
  const { user } = useUser();
  const userId = user?.id;
  const addFriend = useMutation(api.mutations.friends.addFriend);

  const relationshipStatus =
    userId && friendId
      ? useQuery(api.queries.friends.getFriendshipStatus, {
          userId,
          friendId,
        })
      : undefined;

  const handleAddFriend = async () => {
    if (!userId) return;

    try {
      await addFriend({ userId, friendId });
      toast({ description: "Friend request sent!" });
    } catch (error) {
      toast({ description: "Error adding friend", variant: "destructive" });
      console.error("Error adding friend:", error);
    }
  };

  // Jeśli status jest "pending" lub "accepted", przycisk będzie disabled
  const disabled =
    relationshipStatus === "pending" || relationshipStatus === "accepted";

  let buttonLabel = "Add friend";
  if (relationshipStatus === "pending") {
    buttonLabel = "Request sent";
  } else if (relationshipStatus === "accepted") {
    buttonLabel = "Already friends";
  }

  return (
    <button
      onClick={handleAddFriend}
      disabled={disabled}
      className={`px-4 py-2 text-white ${disabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
    >
      {buttonLabel}
    </button>
  );
}
