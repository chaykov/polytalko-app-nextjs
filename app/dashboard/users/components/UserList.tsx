import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import React, { useState } from "react";
import StatusBadge from "../../components/StatusBadge";

export default function UserList() {
  const { user } = useUser();
  const clerkId = user?.id;

  const [sentRequests, setSentRequests] = useState(new Set());

  const users = useQuery(api.queries.users.getAllUsers, {
    clerkId: clerkId || "",
  });

  const sendFriendRequest = useMutation(
    api.mutations.friends.sendFriendRequest
  );

  const cancedFriendRequest = useMutation(
    api.mutations.friends.cancelFriendRequest
  );

  const handleSendFriendRequest = async (clerkIdB: any) => {
    if (!clerkId) return;

    try {
      await sendFriendRequest({ clerkIdA: clerkId, clerkIdB });
      setSentRequests((prev) => {
        const newRequests = new Set(prev);
        newRequests.add(clerkIdB);
        return newRequests;
      });
    } catch (error) {
      alert(error);
    }
  };

  const handleCancelFriendRequest = async (clerkIdB: any) => {
    if (!clerkId) return;

    try {
      await cancedFriendRequest({ clerkIdA: clerkId, clerkIdB });
      setSentRequests((prev) => {
        const newRequests = new Set(prev);
        newRequests.delete(clerkIdB);
        return newRequests;
      });
    } catch (error) {
      alert(error);
    }
  };

  if (!users) {
    <p>Loading list of users...</p>;
  }

  return (
    <div className="p-4 border rounded-md shadow-md w-96">
      <h2 className="text-xl font-bold mb-2">List of users</h2>
      {users?.length === 0 ? (
        <p>No users</p>
      ) : (
        <ul>
          {users?.map((user) => (
            <li key={user.clerkId} className="border-b py-2">
              <div className="flex items-center gap-x-2">
                <StatusBadge showText={false} status={user.status} />
                <span className="font-bold">{user.name}</span>
                {sentRequests.has(user.clerkId) ? (
                  <button
                    onClick={() => handleCancelFriendRequest(user.clerkId)}
                    className="ml-auto bg-gray-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => handleSendFriendRequest(user.clerkId)}
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
