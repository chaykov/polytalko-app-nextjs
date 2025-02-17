"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";

interface AcceptFriendRequestButtonProps {
  friendId?: string;
  userId?: string;
}

export default function AcceptFriendRequestButton({
  friendId,
}: AcceptFriendRequestButtonProps) {
  const { user } = useUser();
  const userId = user?.id;

  const acceptFriendRequest = useMutation(
    api.mutations.friends.acceptFriendRequest
  );

  const handleAccept = async () => {
    if (!friendId || !userId) {
      console.error("friendId is undefined");
      return;
    }

    try {
      await acceptFriendRequest({ userId, friendId });
      alert("Friend request accepted!");
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  return (
    <button
      onClick={handleAccept}
      className="bg-green-500 text-white px-4 py-2 "
    >
      Accept
    </button>
  );
}
