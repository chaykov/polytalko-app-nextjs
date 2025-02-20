"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { MailPlus, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

interface UserCardButtonsProps {
  userId: string;
  relationshipStatus: "pending" | "accepted" | undefined;
}

export default function UserCardButtons({
  userId,
  relationshipStatus,
}: UserCardButtonsProps) {
  const { user } = useUser();
  const currentUserId = user?.id;

  if (!currentUserId || currentUserId === userId) return null;

  // const friendId = userId === currentUserId ? undefined : userId;
  const isFriend = relationshipStatus === "accepted";
  const isPending = relationshipStatus === "pending";

  const isSender = currentUserId === userId;
  const isReceiver = !isSender;

  const addFriend = useMutation(api.mutations.friends.addFriend);
  const acceptFriend = useMutation(api.mutations.friends.acceptFriendRequest);

  const [localStatus, setLocalStatus] = useState(relationshipStatus);

  useEffect(() => {
    if (relationshipStatus) {
      setLocalStatus(relationshipStatus);
    }
  }, [relationshipStatus]);

  const handleAddFriend = async () => {
    if (!currentUserId) return;

    try {
      await addFriend({ userId: currentUserId, friendId: userId });
      setLocalStatus("pending");
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const handleAcceptFriend = async () => {
    if (!currentUserId) return;

    try {
      await acceptFriend({ userId: currentUserId, friendId: userId });
      setLocalStatus("accepted");
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  return (
    <div className="-mt-px flex divide-x divide-gray-200">
      {isFriend ? (
        // ✅ Gdy jesteśmy znajomymi: "Delete friend" + "Chat"
        <>
          <button
            type="button"
            className="hover:bg-red-100 text-red-600 relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold"
          >
            <UserPlus aria-hidden="true" className="size-5" />
            Delete friend
          </button>
          <button
            type="button"
            className="hover:bg-blue-100 hover:text-black/70 relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold"
          >
            <MailPlus aria-hidden="true" className="size-5 text-blue-500" />
            Chat
          </button>
        </>
      ) : localStatus === "pending" ? (
        // ✅ Gdy zaproszenie jest "pending": "Accept friend" dla B lub "Request sent" (disabled) dla A
        <>
          {isReceiver ? (
            <button
              type="button"
              onClick={handleAcceptFriend}
              className="hover:bg-green-100 hover:text-black/70 relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold"
            >
              Accept friend
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="bg-gray-400 text-white cursor-not-allowed relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold"
            >
              Request sent
            </button>
          )}
          <button
            type="button"
            className="hover:bg-blue-100 hover:text-black/70 relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold"
          >
            <MailPlus aria-hidden="true" className="size-5 text-blue-500" />
            Chat
          </button>
        </>
      ) : (
        // ✅ Gdy NIE jesteśmy znajomymi: "Add friend" + "Chat"
        <>
          <button
            type="button"
            onClick={handleAddFriend}
            className="hover:bg-green-100 relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold"
          >
            <UserPlus aria-hidden="true" className="size-5 text-green-500" />
            Add friend
          </button>
          <button
            type="button"
            className="hover:bg-blue-100 hover:text-black/70 relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold"
          >
            <MailPlus aria-hidden="true" className="size-5 text-blue-500" />
            Chat
          </button>
        </>
      )}
    </div>
  );
}
