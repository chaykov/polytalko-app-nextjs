"use client";

import FriendsList from "@/app/dashboard/_components/FriendsList";
import IncomingRequests from "../../_components/IncomingRequests";

export default function UserFriends() {
  return (
    <div className="p-4 border shadow-md rounded-lg mt-4">
      <IncomingRequests buttonTitle="Accept" title="Incoming friends" />

      {/* Sekcja zaakceptowanych znajomych */}
      <FriendsList title="Your friends" />
    </div>
  );
}
