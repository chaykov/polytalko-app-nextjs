"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import ProfileForm from "./components/ProfileForm";
import FriendsList from "../components/FriendsList";
import ProfileStatus from "./components/ProfileStatus";
import EditProfile from "./components/EditProfile";

export default function Profile() {
  // const [isLoaded, setIsLoaded] = useState(false);
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
      <div className="flex flex-row">
        <div className="p-4 border shadow-md w-96">
          <EditProfile userProfile={userProfile} />
        </div>
        <div className="p-4 border shadow-md w-96">
          <h2 className="text-xl font-bold">{userProfile.name}</h2>
          <p>
            <strong>Country:</strong> {userProfile.country || "No set"}
          </p>
          <p>
            <strong>Age:</strong>{" "}
            {userProfile.age ? `${userProfile.age} years old` : "No set"}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {userProfile.description || "No description"}
          </p>
        </div>
      </div>
    </main>
  );
}
