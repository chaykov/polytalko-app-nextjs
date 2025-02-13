// Wyświetla listę znajomych

import FriendItem from "./FriendItem";

interface Friend {
  friendId: string;
  name: string;
  age?: number;
  country?: string;
}

interface FriendListProps {
  friends?: Friend[]; // 🔥 Pozwalamy na `undefined`
}

export default function FriendList({ friends = [] }: FriendListProps) {
  return (
    <div>
      <h3>Your added friends:</h3>
      {friends?.length === 0 ? (
        <p>You have no added friends yet.</p>
      ) : (
        <ul className="flex flex-row gap-2">
          {friends?.map((friend) => (
            <FriendItem key={friend.friendId} friend={friend} />
          ))}
        </ul>
      )}
    </div>
  );
}
