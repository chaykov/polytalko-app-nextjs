"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import StatusBadge from "../../components/StatusBadge";

export default function UserList() {
  const { user } = useUser();
  const clerkId = user?.id || "";

  // 🔍 Pobieramy listę użytkowników
  const users = useQuery(api.queries.users.getAllUsers);

  // 🔍 Pobieramy listę zaproszeń do znajomych (zamiast `useState`)
  const pendingRequests = useQuery(api.queries.friends.getPendingRequests, {
    clerkId: clerkId || "",
  });
  const pendingSet = new Set(pendingRequests?.map((req) => req?.clerkIdB));

  const friendsList = useQuery(api.queries.friends.getFriendsList, {
    clerkId: clerkId || "",
  });
  const friendsSet = new Set(friendsList || []);

  console.log({ pendingRequests, friendsList });

  const sendFriendRequest = useMutation(
    api.mutations.friends.sendFriendRequest
  );
  const cancelFriendRequest = useMutation(
    api.mutations.friends.cancelFriendRequest
  );

  const handleSendFriendRequest = async (clerkIdB: string) => {
    if (!clerkId) return;
    await sendFriendRequest({ clerkIdA: clerkId, clerkIdB });
  };

  const handleCancelFriendRequest = async (clerkIdB: string) => {
    if (!clerkId) return;
    await cancelFriendRequest({ clerkIdA: clerkId, clerkIdB });
  };

  if (!users) {
    return <p>Loading list of users...</p>;
  }

  return (
    <div className="p-4 border rounded-md shadow-md w-96">
      <h2 className="text-xl font-bold mb-2">List of users</h2>
      {users?.length === 0 ? (
        <p>No users</p>
      ) : (
        <ul>
          {users?.map((u) => (
            <li key={u.clerkId} className="border-b py-2">
              <div className="flex items-center gap-x-2">
                <StatusBadge showText={false} status={u.status} />
                <span className="font-bold">{u.name}</span>

                {friendsSet.has(u.clerkId) ? ( // ✅ Jeśli zaproszenie wysłane → "Cancel"
                  <button
                    disabled
                    className="ml-auto bg-gray-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Friends
                  </button>
                ) : pendingSet.has(u.clerkId) ? (
                  <button
                    onClick={() => handleCancelFriendRequest(u.clerkId)}
                    className="ml-auto bg-gray-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                ) : (
                  // ✅ Jeśli brak zaproszenia → "Add"
                  <button
                    onClick={() => handleSendFriendRequest(u.clerkId)}
                    className="ml-auto bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Add
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
