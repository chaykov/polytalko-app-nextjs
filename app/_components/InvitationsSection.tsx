// app/social/profile/InvitationsSection.tsx
"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";

export default function InvitationsSection({ userId }: { userId: string }) {
  const invitations = useQuery(api.queries.getInvitationsForUser, { userId });
  const acceptInvitation = useMutation(api.mutations.acceptInvitation);
  const [processing, setProcessing] = useState<string[]>([]);

  if (!invitations) {
    return <p>Request is loading...</p>;
  }

  if (invitations.length === 0) {
    return <p className="mt-4 text-gray-500">No requests.</p>;
  }

  const handleAccept = async (inviteId: Id<"invitations">) => {
    setProcessing((prev) => [...prev, inviteId]);
    try {
      await acceptInvitation({ inviteId });
    } catch (error) {
      console.error("Failed accept:", error);
    } finally {
      setProcessing((prev) => prev.filter((id) => id !== inviteId));
    }
  };

  return (
    <div className="">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Requests to accept
      </h2>
      <ul className="space-y-4">
        {invitations.map((invitation) => (
          <li
            key={invitation._id}
            className="flex justify-between items-center"
          >
            <p className="text-gray-700">
              Requests from: {invitation.senderId}
            </p>
            <button
              onClick={() => handleAccept(invitation._id)}
              disabled={processing.includes(invitation._id)}
              className={`py-1 px-3 rounded-md text-white ${
                processing.includes(invitation._id)
                  ? "bg-gray-400"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {processing.includes(invitation._id) ? "Procesing..." : "Accept"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
