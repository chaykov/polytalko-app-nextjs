import { auth } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const { userId: loggedInUserId } = await auth();

  if (!loggedInUserId) {
    return <p className="text-red-500">You are not logged in!</p>;
  }

  return <div className="flex flex-row">ProfilePage</div>;
}
