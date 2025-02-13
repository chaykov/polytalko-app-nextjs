"use client";

// Utils
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import AllUserList from "./_components/AllUserList";
import UserFriends from "./_components/UserFriends";
import { useUser } from "@clerk/nextjs";

// Komponenty

export default function Users() {
  const { user } = useUser();

  const users =
    useQuery(api.queries.users.getAllUsers, { userId: user?.id || "" }) || [];

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-2">
        {/* <AllUserList users={users} /> */}
        <UserFriends />
      </div>
    </div>
  );
}
