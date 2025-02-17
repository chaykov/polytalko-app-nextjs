"use client";

import { api } from "@/convex/_generated/api";
import { FriendRelationship } from "@/types/FriendRelationship";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React, { useMemo, useEffect, useState } from "react";

interface FriendsListProps {
  title?: string;
}

export default function FriendsList({
  title = "Your friends",
}: FriendsListProps) {
  const { user } = useUser();
  const userId = user?.id;

  // 📌 Pobieramy dane ZAWSZE na górze komponentu
  const acceptedFriendsData = useQuery(api.queries.users.getAcceptedFriends, {
    userId: userId || "",
  });

  // 📌 Używamy `useState()` zamiast `useRef()`, aby przechowywać poprzednie dane
  const [acceptedFriends, setAcceptedFriends] = useState<FriendRelationship[]>(
    []
  );

  // 📌 `useEffect()` monitoruje `JSON.stringify()`, aby wykrywać realne zmiany
  useEffect(() => {
    if (
      JSON.stringify(acceptedFriends) !== JSON.stringify(acceptedFriendsData)
    ) {
      setAcceptedFriends(acceptedFriendsData ?? []);
    }
  }, [acceptedFriendsData]);

  // 📌 `useMemo()` optymalizuje listę unikalnych znajomych
  const uniqueFriends = useMemo(() => {
    return Array.from(
      new Map(
        acceptedFriends.map((friend) => [
          friend.userId === userId ? friend.friendId : friend.userId,
          friend,
        ])
      ).values()
    );
  }, [JSON.stringify(acceptedFriends), userId]);

  return (
    <div className="p-4 border shadow-md rounded-lg mt-4">
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
