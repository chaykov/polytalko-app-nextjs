import { useUser } from "@clerk/nextjs";

export default function ProfileStatus() {
  const { user } = useUser();

  return (
    <div className="flex flex-1">
      <div>
        <h2 className="text-lg font-bold">Hi, {user?.fullName}</h2>
        <p className="text-gray-900">
          Email: {user?.primaryEmailAddress?.emailAddress}
        </p>

        {/* <LogoutButton userId={userId as string} /> */}
      </div>
    </div>
  );
}
