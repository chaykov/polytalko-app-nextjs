import InvitationsSection from "@/components/InvitationsSection";
import { api } from "@/convex/_generated/api";
import { convexQuery } from "@/lib/convex-utils";
import { auth } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import Link from "next/link";

export const revalidate = 300;

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { userId: loggedInUserId } = await auth();
  const resolvedSearchParams = await searchParams;

  if (!loggedInUserId) {
    return <p className="text-red-500">You are not logged in!</p>;
  }

  await fetchMutation(api.mutations.updateUserStatus, {
    clerkId: loggedInUserId,
  });

  const userIdFromParams =
    typeof resolvedSearchParams.userId === "string"
      ? resolvedSearchParams.userId
      : undefined;

  const targetUserId = userIdFromParams || loggedInUserId;
  const userData = await convexQuery("getUserProfile", {
    userId: targetUserId,
  });

  if (!userData) {
    return <p>No found user data</p>;
  }

  console.log(userData);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <span
          className={`ml-2 w-3 h-3 rounded-full ${isOnline(userData.lastSeen) ? "bg-green-500" : "bg-red-500"}`}
          title={isOnline(userData.lastSeen) ? "Online" : "Offline"}
        />
      </div>
      <div>
        <p>
          Name: <span className="text-gray-900">{userData.name}</span>
        </p>
        <p>
          Bio: <span className="text-gray-900">{userData.bio || "No bio"}</span>
        </p>
        {targetUserId === loggedInUserId && (
          <Link
            href="/social/profile/edit"
            className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 hover:bg-blue-600"
          >
            Edit profile
          </Link>
        )}
      </div>
      {targetUserId === loggedInUserId && (
        <InvitationsSection userId={loggedInUserId} />
      )}
    </>
  );
}

function isOnline(lastSeen: number): boolean {
  const oneMinuteAgo = Date.now() - 1 * 60 * 1000;
  return lastSeen > oneMinuteAgo;
}
