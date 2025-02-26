"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";

export default function InviteButton({
  senderId,
  recipientId,
}: {
  senderId: string;
  recipientId: string;
}) {
  const sendInvitation = useMutation(api.mutations.sendInvitation);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const existingRelation = useQuery(api.queries.checkFriendship, {
    userId1: senderId,
    userId2: recipientId,
  });
  const pendingInvitation = useQuery(api.queries.checkPendingInvitation, {
    userId1: senderId,
    userId2: recipientId,
  });

  const handleInvite = async () => {
    setIsSending(true);
    setError(null);
    try {
      await sendInvitation({ senderId, recipientId });
      setSent(true);
    } catch (error) {
      const err = error as Error;
      setError(err.message || "Error to send a request friend");
    } finally {
      setIsSending(false);
    }
  };

  if (existingRelation?.isFriends) {
    return <span className="text-gray-500">Friends</span>;
  }

  if (pendingInvitation?.hasPending) {
    return (
      <span className="text-gray-500">
        {pendingInvitation.isSender
          ? "A request sent"
          : "Waiting for accepting"}
      </span>
    );
  }

  if (error) {
    return <span className="text-red-500">{error}</span>;
  }

  return (
    <button
      onClick={handleInvite}
      disabled={isSending || sent}
      className={`py-1 px-3 text-white ${isSending || sent ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
    >
      {sent ? "Sent" : isSending ? "Sending..." : "Invite"}
    </button>
  );
}
