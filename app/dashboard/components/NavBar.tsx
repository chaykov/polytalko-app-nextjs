"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  const { user } = useUser();
  const clerkId = user?.id || "";

  const pendingRequestsCount = useQuery(
    api.queries.friends.getPendingRequestsCount,
    {
      clerkId: clerkId || "",
    }
  );

  const showPendingRequestsCount =
    pendingRequestsCount && pendingRequestsCount > 0 ? (
      <span className="ml-1 px-2 py-1 text-sm bg-red-500 rounded-full">
        +{pendingRequestsCount}
      </span>
    ) : null;

  return (
    <header className="flex py-4 shadow-sm bg-grey-800 px-8">
      <nav className="flex items-center gap-10 cointainer">
        <Link className="mr-auto" href="/dashboard">
          PolyTalko
        </Link>

        <Link href="/dashboard/profile">
          Profile {showPendingRequestsCount}
        </Link>
        <Link href="/dashboard/users">Users</Link>
        <Link href="/dashboard/messages">Messages</Link>
        <Link href="/dashboard/chat">Chat</Link>
      </nav>
    </header>
  );
}
