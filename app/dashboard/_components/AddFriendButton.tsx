"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";

interface AddFriendButtonProps {
  friendId: string;
}

export default function AddFriendButton({ friendId }: AddFriendButtonProps) {
  const { user } = useUser();
  const userId = user?.id;

  const addFriend = useMutation(api.mutations.addFriend);

  const handleAddFriend = async () => {
    if (!userId) return;

    try {
      await addFriend({ userId, friendId });
      alert("Friend added successfully!");
    } catch (error) {
      console.error("Error adding friend:", error);
      alert("An error occurred.");
    }
  };

  return (
    <button
      onClick={handleAddFriend}
      className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
    >
      Add friend
    </button>
  );
}
