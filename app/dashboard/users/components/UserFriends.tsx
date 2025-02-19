"use client";

import FriendsList from "@/app/dashboard/components/FriendsList";
import IncomingRequests from "../../components/IncomingRequests";

export default function UserFriends() {
  return (
    <div className="p-4 border shadow-md rounded-lg mt-4">
      {/* Sekcja przychodzacych zaproszen do znajomych*/}
      <IncomingRequests buttonTitle="Accept" title="Incoming friends" />

      {/* Sekcja zaakceptowanych znajomych */}
      <FriendsList title="Your friends" />
    </div>
  );
}
