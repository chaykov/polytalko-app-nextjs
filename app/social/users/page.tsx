import InviteButton from "@/app/_components/InviteButton";
import { api } from "@/convex/_generated/api";
import { convexQuery } from "@/lib/convex-utils";
import { auth } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import Link from "next/link";

export default async function Users() {
  const { userId } = await auth();

  if (!userId) {
    return <p className="text-red-500">You are not logged in!</p>;
  }

  await fetchMutation(api.mutations.updateUserStatus, {
    clerkId: userId,
  });

  const users = await convexQuery("getAllUsers");

  if (!users || (Array.isArray(users) && users.length === 0)) {
    return <p className="text-gray-500">No users.</p>;
  }

  if (!Array.isArray(users)) {
    return <p className="text-red-500">Error: Incorrect user data.</p>;
  }

  const otherUsers = users.filter((user) => user.clerkId !== userId);

  if (otherUsers.length === 0) {
    return <p className="text-gray-500">No users.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Wszyscy użytkownicy
      </h1>
      <ul className="bg-white p-6 rounded-lg shadow-md space-y-4">
        {otherUsers.map((user) => (
          <li
            key={user.clerkId}
            className="border-b pb-2 flex justify-between items-center"
          >
            <div>
              <div className="flex items-center">
                <p className="text-gray-900 font-semibold">{user.name}</p>
                <span
                  className={`ml-2 w-3 h-3 rounded-full ${
                    isOnline(user.lastSeen) ? "bg-green-500" : "bg-red-500"
                  }`}
                  title={isOnline(user.lastSeen) ? "Online" : "Offline"}
                />
                <span className="ml-1 text-sm text-gray-600">
                  {getStatusText(user.lastSeen)}
                </span>
              </div>
              <p className="text-gray-600">{user.bio || "Brak opisu"}</p>
              <Link
                href={`/social/profile?userId=${user.clerkId}`}
                className="text-blue-500 hover:underline"
              >
                Zobacz profil
              </Link>
            </div>
            {user.clerkId !== userId && (
              <InviteButton senderId={userId} recipientId={user.clerkId} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function isOnline(lastSeen: number): boolean {
  const oneMinuteAgo = Date.now() - 1 * 60 * 1000;
  return lastSeen > oneMinuteAgo;
}

function getStatusText(lastSeen: number): string {
  if (isOnline(lastSeen)) {
    return "Online";
  }

  const minuteAge = Math.floor((Date.now() - lastSeen) / (60 * 1000));
  return `${minuteAge} min ago`;
}
