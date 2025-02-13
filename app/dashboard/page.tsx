"use client";

import { SignedIn, SignOutButton, useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { user, isLoaded } = useUser();

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
    </>
  );
}
