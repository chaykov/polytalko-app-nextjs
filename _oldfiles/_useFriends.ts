import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useFriends(userId?: string) {
  // Jeśli `userId` jest `undefined`, `useQuery` w ogóle nie powinno być wywołane
  const friends = useQuery(
    api.queries.getFriendsWithNames,
    userId ? { userId } : "skip"
  );

  return friends || []; // Jeśli `friends` jest undefined, zwracamy pustą tablicę
}
