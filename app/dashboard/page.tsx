"use client";

import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { DotIcon } from "lucide-react";

export default function Dashboard() {
  const { user } = useUser();
  return (
    <>
      <div>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Action
              label="Open chat"
              labelIcon={<DotIcon />}
              onClick={() => alert("init chat")}
            />
          </UserButton.MenuItems>
        </UserButton>

        <div>
          Logged in {user?.fullName}
          <SignOutButton>
            <button className="py-2 px-4 bg-red-200 hover:bg-red-50">
              Log out
            </button>
          </SignOutButton>
        </div>
        <div>
          Logged out
          <SignInButton>
            <button className="py-2 px-4 bg-red-200 hover:bg-red-50">
              Login
            </button>
          </SignInButton>
        </div>
      </div>

      <div className="p-8"></div>
    </>
  );
}
