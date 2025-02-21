"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import EditProfile from "./components/EditProfile";
import ShowProfile from "./components/ShowProfile";

export default function Profile() {
  const { user } = useUser();
  const clerkId = user?.id;

  const userProfile = useQuery(api.queries.users.getUserProfile, {
    clerkId: clerkId || "",
  });

  if (!userProfile) {
    return <p>Profile is loading...</p>;
  }

  return (
    <main>
      <div className="flex flex-row space-x-4 justify-center">
        <ShowProfile userProfile={userProfile} />
        <EditProfile userProfile={userProfile} />
      </div>
    </main>
  );
}
