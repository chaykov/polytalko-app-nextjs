"use client";

import Link from "next/link";
// import { SignOutButton } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
import AuthControls from "./AuthControls";

export default function NavBar() {
  // const router = useRouter();

  return (
    <header className="flex py-4 shadow-sm bg-grey-800 px-8">
      <nav className="flex items-center gap-10 cointainer">
        <Link className="mr-auto" href="/social">
          PolyTalko
        </Link>

        <Link href="/social/profile">Profile</Link>
        <Link href="/social/users">Users</Link>
        {/* <Link href="/social/messages">Messages</Link> */}
        {/* <Link href="/social/chat">Chat</Link> */}
      </nav>
      <div className="ml-auto">
        <AuthControls />
        {/* <SignOutButton redirectUrl={"/"}>
          <button
            onClick={() => router.push("/")}
            className="bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-xs hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Log out
          </button>
        </SignOutButton> */}
      </div>
    </header>
  );
}
