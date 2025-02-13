// Komponent do wyświetlania pojedycznego znajomego

interface FriendItem {
  friendId: string;
  name: string;
  age?: number;
  country?: string;
}

interface FriendItemProps {
  friend: FriendItem;
}

export default function FriendItem({ friend }: FriendItemProps) {
  return (
    <li className="flex items-center gap-2">
      <div className="flex flex-col gap-4 border-2 p-4">
        <span>{friend.name}</span>
        <span>{friend.age}</span>
        <span>{friend.country}</span>
      </div>
    </li>
  );
}
