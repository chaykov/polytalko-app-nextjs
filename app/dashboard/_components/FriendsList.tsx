"use client";

import { api } from "@/convex/_generated/api";
import { FriendRelationship } from "@/types/FriendRelationship";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React, { useEffect, useState } from "react";

interface FriendsListProps {
  title?: string;
}

export default function FriendsList({
  title = "Your friends",
}: FriendsListProps) {
  const { user } = useUser();
  const userId = user?.id;

  // 📌 `useQuery()` działa zawsze, ale jego wynik jest przechowywany w `useState()`
  const acceptedFriendsData = useQuery(api.queries.users.getAcceptedFriends, {
    userId: userId || "",
  });

  const [acceptedFriends, setAcceptedFriends] = useState<FriendRelationship[]>(
    []
  );

  // 📌 `useEffect()` aktualizuje stan tylko, gdy dane faktycznie się zmieniają
  useEffect(() => {
    if (acceptedFriendsData && acceptedFriendsData !== acceptedFriends) {
      setAcceptedFriends(acceptedFriendsData);
    }
  }, [acceptedFriendsData, acceptedFriends]);

  return (
    <div className="p-4 border shadow-md rounded-lg mt-4">
      <h3 className="text-lg font-bold">{title}</h3>
      {acceptedFriends.length === 0 ? (
        <p>You have no friends yet.</p>
      ) : (
        <ul>
          {acceptedFriends.map((friend) => {
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
