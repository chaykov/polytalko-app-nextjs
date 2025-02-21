"use client";

import UserList from "./components/UserList";

export default function Users() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="gap-4 flex flex-col">
        <UserList />
      </div>
    </div>
  );
}
