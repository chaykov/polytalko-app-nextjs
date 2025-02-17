"use client";

// Utils
import UserList from "./components/UserList";
import FriendsList from "../_components/FriendsList";

// Komponenty

export default function Users() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-2">
        <UserList />
        <FriendsList />
      </div>
    </div>
  );
}
