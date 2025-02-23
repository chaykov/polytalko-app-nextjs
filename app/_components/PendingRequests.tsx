import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import React from "react";

export default function PendingRequests() {
  const { user } = useUser();
  const clerkId = user?.id || "";

  const pendingRequests = useQuery(api.queries.friends.getPendingRequests, {
    clerkId: clerkId || "",
  });

  const acceptFriendRequest = useMutation(
    api.mutations.friends.acceptFriendRequest
  );
  const rejectFriendRequest = useMutation(
    api.mutations.friends.rejectFriendRequest
  );

  if (!pendingRequests) {
    return <p>Request is loading...</p>;
  }

  return (
    <div className="p-4 border rounded-md shadow-md w-96">
      <h2 className="text-xl font-bold mb-2">Pending Requests</h2>
      {pendingRequests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <ul>
          {pendingRequests?.map((req) => (
            <li
              key={req?._id}
              className="border-b py-2 flex items-center gap-2"
            >
              <span className="font-bold">{req?.clerkIdA}</span>
              <button
                onClick={() =>
                  acceptFriendRequest({
                    clerkIdA: req?.clerkIdA || "",
                    clerkIdB: clerkId,
                  })
                }
                className="bg-green-500 text-white px-3 py-1 rounded text-sm"
              >
                Accept
              </button>
              <button
                onClick={() =>
                  rejectFriendRequest({
                    clerkIdA: req?.clerkIdA || "",
                    clerkIdB: clerkId,
                  })
                }
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
