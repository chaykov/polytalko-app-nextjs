export interface IFriend {
  userId: string;
  friendId: string;
  status: "pending" | "accepted";
  createdAt: number;
}
