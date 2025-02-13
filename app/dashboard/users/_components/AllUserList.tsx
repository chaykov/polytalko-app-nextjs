"use client";

import { useUser } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import LogoutButton from "../../_components/LogoutButton";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AddFriendButtonStatus from "./AddFriendStatusButton";

interface UserListProps {
  users: Array<{
    userId: string;
    isOnline: boolean;
    name: string;
    email: string;
    age?: number;
    country?: string;
    description?: string;
  }>;
}

export default function AllUserList({ users }: UserListProps) {
  const { user } = useUser();
  const userId = user?.id;
  const { isSignedIn } = useAuth();

  const loading = users === undefined || users.length === 0;

  // Pobieranie listy przychodzących zaproszeń i zaakceptowanych znajomych
  const pendingRequests = useQuery(
    api.queries.getIncomingFriendRequests.getIncomingFriendRequests,
    { userId: userId || "" }
  );
  const acceptedFriends = useQuery(
    api.queries.getAcceptedFriends.getAcceptedFriends,
    { userId: userId || "" }
  );

  // Pobieranie wszsytkich uzytkownikow (pozostalych) - przykladowo
  const getAllUsers = useQuery(api.queries.getAllUsers, {
    userId: userId || "",
  });

  // Funkcja, ktora dla danego friendId zwraca status relacji, jesli istnieje
  const getRelationshipStatus = (
    friendId: string
  ): "pending" | "accepted" | undefined => {
    // sprawdz, czy w pendingRequests jest rekord, gdzie friendId odpowiada wyslanemu zaproszeniu
    if (pendingRequests?.some((req) => req.userId === friendId)) {
      return "pending";
    }

    // sprawdz czy w acceptedFriends jest rekord, gdize zapytanie zwraca obiekty z polami userId i friendId
    if (
      acceptedFriends?.some(
        (rel) => rel.userId === friendId || rel.friendId === friendId
      )
    ) {
      return "accepted";
    }

    return undefined;
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      {isSignedIn && user ? (
        <>
          <h2 className="text-lg font-bold">Hi, {user?.fullName}</h2>
          <p className="text-gray-900">
            Email: {user?.primaryEmailAddress?.emailAddress}
          </p>

          <LogoutButton userId={user.id} />

          <h3 className="mt-4 text-lg font-semibold">List of users:</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {getAllUsers?.map((u) => {
                // pomin samego siebie:
                if (u.userId === userId) return null;

                const relationshipStatus = getRelationshipStatus(u.userId);

                return (
                  <li key={u.userId} className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${u.isOnline ? "bg-green-500" : "bg-red-500"}`}
                      title={u.isOnline ? "Online" : "Offline"}
                    ></span>
                    {u.name} - ({u.email})
                    <AddFriendButtonStatus
                      friendId={u.userId}
                      relationshipStatus={relationshipStatus}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </>
      ) : (
        <p>Login, to see your profile.</p>
      )}
    </div>
  );
}
