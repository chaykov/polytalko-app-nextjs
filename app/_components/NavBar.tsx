import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import AuthControls from "./AuthControls";

export default async function NavBar() {
  const { userId } = await auth();

  console.log(userId);

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
      </div>
    </header>
  );
}
