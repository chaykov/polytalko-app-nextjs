import { auth } from "@clerk/nextjs/server";
import React from "react";

export default async function DashobardPage() {
  const { userId } = await auth();

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-gray-900">Witaj w PolyTalko</h1>
      {userId && <p>You are logged in! </p>}
    </div>
  );
}
