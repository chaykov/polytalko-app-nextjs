"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { toast } from "@/hooks/use-toast";
import { FriendRelationship } from "@/types/FriendRelationship";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";

interface IncomingRequestsProps {
  title?: string;
  buttonTitle: string;
}

export default function IncomingRequests({
  title,
  buttonTitle,
}: IncomingRequestsProps) {
  const { user } = useUser();
  const userId = user?.id;

  const incomingRequestsData = useQuery(
    api.queries.users.getIncomingFriendRequests,
    {
      userId: userId || "",
    }
  );

  const [iconmingRequests, setIncomingRequests] = useState<
    FriendRelationship[]
  >([]);

  const incomingRequests: FriendRelationship[] = React.useMemo(() => {
    return incomingRequestsData ? [...incomingRequestsData] : [];
  }, [incomingRequestsData]);

  const acceptFriend = useMutation(api.mutations.friends.acceptFriendRequest);

  // Obsługa akceptowania zaproszenia
  const handleAccept = async (request: FriendRelationship) => {
    if (!userId || !request.friendId) return;

    try {
      await acceptFriend({ userId, friendId: request.userId });
    } catch (error) {
      toast({ description: "Error accepting friend:", variant: "destructive" });
      console.error("Error accepting friend", error);
    }
  };

  useEffect(() => {
    if (incomingRequestsData && incomingRequestsData !== incomingRequests) {
      setIncomingRequests(incomingRequestsData);
    }
  }, [incomingRequestsData]);

  return (
    <div className="p-4 border shadow-md rounded-lg mt-4">
      <h3 className="text-lg font-bold">{title}</h3>
      {incomingRequests.length === 0 ? (
        <p>No incoming friend requests.</p>
      ) : (
        <ul>
          {incomingRequests.map((request) => (
            <li
              key={request._id}
              className="flex items-center gap-2 border p-2 rounded-md"
            >
              <span>From: {request.userId}</span>
              <button
                className="bg-green-500 text-white px-2 pt-1 rounded"
                onClick={() => handleAccept(request)}
              >
                {buttonTitle}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
