"use client";

// Utils
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

// Komponenty
import AllUserList from "./components/AllUserList";
import UserFriends from "./components/UserFriends";

export default function Users() {
  const users = useQuery(api.getUsers.getUsers) || [];

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-2">
        <AllUserList users={users} />
        <UserFriends />
      </div>
    </div>
  );
}
