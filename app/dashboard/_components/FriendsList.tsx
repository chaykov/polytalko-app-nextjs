"use client";

import { api } from "@/convex/_generated/api";
import { FriendRelationship } from "@/types/FriendRelationship";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React, { useMemo, useEffect } from "react";

interface FriendsListProps {
  title?: string;
}

export default function FriendsList({
  title = "Your friends",
}: FriendsListProps) {
  const { user } = useUser();
  const userId = user?.id;

  // 📌 `useQuery()` pozostaje na górze komponentu
  const acceptedFriendsData = useQuery(api.queries.users.getAcceptedFriends, {
    userId: userId || "",
  });

  // 📌 `useMemo()` tylko dla przetwarzania wyników, nie dla `useQuery()`
  const acceptedFriends: FriendRelationship[] = useMemo(
    () => acceptedFriendsData ?? [],
    [acceptedFriendsData]
  );

  // 📌 `useMemo()` dla `uniqueFriends`, aby uniknąć re-renderów
  const uniqueFriends = useMemo(() => {
    return Array.from(
      new Map(
        acceptedFriends.map((friend) => [
          friend.userId === userId ? friend.friendId : friend.userId,
          friend,
        ])
      ).values()
    );
  }, [acceptedFriends, userId]);

  // 📌 `useEffect()` uruchomi się tylko, gdy `acceptedFriends` faktycznie się zmieni
  useEffect(() => {
    console.log("Accepted friends:", acceptedFriends);
  }, [acceptedFriends]);

  return (
    <div className="p-4 border shadow-md rounded-lg">
      <h3 className="text-lg font-bold">{title}</h3>
      {uniqueFriends.length === 0 ? (
        <p>You have no friends yet.</p>
      ) : (
        <ul>
          {uniqueFriends.map((friend) => {
            const friendDisplay =
              friend.userId === userId ? friend.friendId : friend.userId;

            return (
              <li
                className="flex flex-col gap-2 border p-2 rounded-md"
                key={friend._id}
              >
                <span className="font-bold">{friendDisplay}</span>
                <span>Age: {friend.age || "N/A"}</span>
                <span>Country: {friend.country || "Unknown"}</span>
                <span>
                  Description: {friend.description || "No description"}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
