export interface FriendRelationship {
  _id: string;
  userId: string;
  friendId?: string; // Opcjonalne
  status?: string;
  createdAt: number;
}
