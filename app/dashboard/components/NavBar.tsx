import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <header className="flex py-4 shadow-sm bg-grey-800 px-8">
      <nav className="flex items-center gap-10 cointainer">
        <Link className="mr-auto" href="/dashboard">
          PolyTalko
        </Link>

        <Link href="/dashboard/profile">Profile</Link>
        <Link href="/dashboard/users">Users</Link>
        <Link href="/dashboard/messages">Messages</Link>
        <Link href="/dashboard/chat">Chat</Link>
      </nav>
    </header>
  );
}
