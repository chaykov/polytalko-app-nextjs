"use client";

import { api } from "@/convex/_generated/api";
import { toast } from "@/hooks/use-toast";
import { FriendRelationship } from "@/types/FriendRelationship";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { useEffect } from "react";

export default function UserFriends() {
  const { user } = useUser();
  const userId = user?.id;

  const incomingRequests: FriendRelationship[] =
    useQuery(api.queries.getIncomingFriendRequests.getIncomingFriendRequests, {
      userId: userId || "",
    }) ?? [];

  const acceptedFriends: FriendRelationship[] =
    useQuery(api.queries.getAcceptedFriends.getAcceptedFriends, {
      userId: userId || "",
    }) ?? [];

  const acceptFriend = useMutation(api.mutations.acceptFriend.acceptFriend);

  // Obsługa akceptowania zaproszenia
  const handleAccept = async (request: FriendRelationship) => {
    if (!userId || !request.friendId) return;

    try {
      await acceptFriend({ userId, friendId: request.userId });
    } catch (error) {
      toast({ description: "Error accepting friend:", variant: "destructive" });
    }
  };

  // Debug: Logowawnie danych, aby upewnić się, ze są pobierane
  useEffect(() => {
    console.log("Incoming request:", incomingRequests);
    console.log("Accepted friends:", acceptedFriends);
  }, [incomingRequests, acceptedFriends]);

  if (!user) return <p>Please log in to view friend requests.</p>;

  return (
    <div className="p-4 border shadow-md rounded-lg mt-4">
      <h2 className="text-lg font-bold">Friend requests and friends</h2>

      {/* Sekcja przychodzacych zaproszen */}
      <h3 className="mt-4 font-semibold">Incoming friend requests:</h3>
      {incomingRequests === undefined ? (
        <p>Loading friend requests...</p>
      ) : incomingRequests.length === 0 ? (
        <p>No incoming friend requests.</p>
      ) : (
        <ul>
          {incomingRequests.map((request) => (
            <li key={request._id} className="flex items-center gap-2">
              <span>From: {request.userId}</span>
              <button
                className="bg-green-500 text-white px-2 pt-1"
                onClick={() => handleAccept(request)}
              >
                Accept
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Sekcja zaakceptowanych znajomych */}
      <h3 className="mt-4 font-semibold">Your friends:</h3>
      {acceptedFriends === undefined ? (
        <p>Loading friends...</p>
      ) : acceptedFriends.length === 0 ? (
        <p>You have no friends yet.</p>
      ) : (
        <ul>
          {acceptedFriends.map((friend) => {
            const friendDisplay =
              friend.userId === userId ? friend.friendId : friend.userId;
            return (
              <li className="flex items-center gap-2" key={friend._id}>
                <span>{friendDisplay}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
