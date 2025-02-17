import { useUser } from "@clerk/nextjs";
import AcceptFriendRequestButton from "./AcceptFriendStatusButton";
import AddFriendButtonStatus from "./AddFriendStatusButton";

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
  const { user } = useUser();
  const currentUserId = user?.id;

  const friendId = userId === currentUserId ? undefined : userId;

  return (
    <li className="flex items-center gap-2">
      {friendId &&
        (relationshipStatus === "pending" ? (
          <AcceptFriendRequestButton friendId={friendId} />
        ) : (
          <AddFriendButtonStatus
            friendId={friendId}
            // relationshipStatus={relationshipStatus}
          />
        ))}
      {name} - ({email})
      {rest.age ? <span>Age: {rest.age}</span> : <span>No age</span>}
      {rest.country ? (
        <span>Country: {rest.country}</span>
      ) : (
        <span>No country</span>
      )}
      {rest.description ? (
        <span>Description: {rest.description}</span>
      ) : (
        <span>No description</span>
      )}
    </li>
  );
}
