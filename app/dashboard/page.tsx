"use client";

import { SignedIn, SignOutButton, useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <>
      <div>
        {isLoaded && (
          <div>
            Logged in {user?.fullName}
            <SignedIn>
              <SignOutButton redirectUrl={"/"}>
                <button className="py-2 px-4 bg-red-200 hover:bg-red-50">
                  Log out
                </button>
              </SignOutButton>
            </SignedIn>
          </div>
        )}
      </div>

      <div className="p-8"></div>
    </>
  );
}
