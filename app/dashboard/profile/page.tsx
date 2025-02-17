"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import ProfileForm from "./components/ProfileForm";
import FriendsList from "../_components/FriendsList";

export default function Profile() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useUser();
  const userId = user?.id;

  const userProfile = useQuery(api.queries.users.getUserById, {
    userId: userId || "",
  });

  return (
    <div>
      <h2>Profile {user?.fullName}</h2>
      {user ? (
        <>
          <ProfileForm
            userId={userId}
            userProfile={userProfile}
            setIsLoaded={setIsLoaded}
          />
          <FriendsList title="Your friends" />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
