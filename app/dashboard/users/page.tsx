"use client";

// Utils
import UserList from "./components/UserList";
import FriendsList from "../components/FriendsList";
import { Input } from "@/components/ui/input";

// Komponenty

export default function Users() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="gap-4 flex flex-col">
        {/* <Input type="text" placeholder="Search a friend" /> */}
        <UserList />
        {/* <FriendsList /> */}
      </div>
    </div>
  );
}
