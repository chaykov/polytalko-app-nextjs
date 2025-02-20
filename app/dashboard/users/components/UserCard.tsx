import { getGravatarUrl } from "@/utils/getGravatarUrl";
import UserCardButtons from "./UserCardButtons";
import { useUser } from "@clerk/nextjs";

interface UserCardProps {
  userId: string;
  name?: string;
  email?: string;
  age?: number;
  country?: string;
  description?: string;
  relationshipStatus: "pending" | "accepted" | undefined;
}

export default function UserCard({
  userId,
  name,
  email,
  relationshipStatus,
  ...rest
}: UserCardProps) {
  return (
    // <li className="flex items-center gap-2">
    //   {friendId &&
    //     (relationshipStatus === "pending" ? (
    //       <AcceptFriendRequestButton friendId={friendId} />
    //     ) : (
    //       <AddFriendButtonStatus
    //         friendId={friendId}
    //         // relationshipStatus={relationshipStatus}
    //       />
    //     ))}
    //   {name} - ({email})
    //   {rest.age ? <span>Age: {rest.age}</span> : <span>No age</span>}
    //   {rest.country ? (
    //     <span>Country: {rest.country}</span>
    //   ) : (
    //     <span>No country</span>
    //   )}
    //   {rest.description ? (
    //     <span>Description: {rest.description}</span>
    //   ) : (
    //     <span>No description</span>
    //   )}
    // </li>

    <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-sm">
      <div className="flex flex-1 flex-col p-8">
        <img
          src={getGravatarUrl(email)}
          alt={name || "User"}
          className="mx-auto size-32 shrink-0 rounded-full"
        />
        <h3 className="mt-6 text-sm font-medium text-gray-900">{name}</h3>
        <dl className="mt-1 flex grow flex-col justify-between">
          <dt className="sr-only">Country</dt>
          <dd className="text-sm text-gray-500">{"No country"}</dd>
          <dt className="sr-only">E-mail</dt>
          <dd className="mt-3">
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
              {email}
            </span>
          </dd>
        </dl>
      </div>
      <div>
        <UserCardButtons
          relationshipStatus={relationshipStatus}
          userId={userId}
        />
      </div>
    </li>
  );
}
