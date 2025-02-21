"use client";

import { UserProfile } from "@/types/types";
import StatusBadge from "../../components/StatusBadge";

export default function ShowProfile({
  userProfile,
}: {
  userProfile: UserProfile;
}) {
  return (
    <div className="p-4 border shadow-md flex-1">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">{userProfile.name}</h2>
        <StatusBadge status={userProfile.status} />
      </div>
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
  );
}
