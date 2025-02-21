import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React from "react";
import StatusBadge from "../../components/StatusBadge";

export default function UserList() {
  const { user } = useUser();
  const clerkId = user?.id;

  const users = useQuery(api.queries.users.getAllUsers, {
    clerkId: clerkId || "",
  });

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
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
