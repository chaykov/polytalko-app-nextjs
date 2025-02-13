"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import ProfileForm from "./components/ProfileForm";
import FriendList from "./components/FriendList";
// import { useProfile } from "@/hooks/_useProfile";
// import { useFriends } from "@/hooks/_useFriends";

export default function Profile() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useUser();
  const userId = user?.id;

  // const userProfile = useProfile(userId);
  // const friends = useFriends(userId);

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
          <FriendList friends={friends} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
