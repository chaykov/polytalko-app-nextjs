import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import UserCard from "./UserCard";

export default function UserList() {
  const { user } = useUser();
  const userId = user?.id;

  // Pobieranie wszsytkich uzytkownikow (pozostalych) - przykladowo
  const allUsers = useQuery(api.queries.users.getAllUsers, {
    userId: userId || "",
  });

  // Pobieranie listy przychodzących zaproszeń i zaakceptowanych znajomych
  const pendingRequests = useQuery(
    api.queries.users.getIncomingFriendRequests,
    { userId: userId || "" }
  );
  const acceptedFriends = useQuery(api.queries.users.getAcceptedFriends, {
    userId: userId || "",
  });

  // Funkcja, ktora dla danego friendId zwraca status relacji, jesli istnieje
  const getRelationshipStatus = (
    friendId: string
  ): "pending" | "accepted" | undefined => {
    // sprawdz, czy w pendingRequests jest rekord, gdzie friendId odpowiada wyslanemu zaproszeniu
    if (pendingRequests?.some((req) => req.userId === friendId)) {
      return "pending";
    }

    // sprawdz czy w acceptedFriends jest rekord, gdize zapytanie zwraca obiekty z polami userId i friendId
    if (
      acceptedFriends?.some(
        (rel) => rel.userId === friendId || rel.friendId === friendId
      )
    ) {
      return "accepted";
    }

    return undefined;
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h3 className="mt-4 text-lg font-semibold">List of users:</h3>
      {allUsers?.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {allUsers?.map((allUser) => {
            if (allUser.userId === userId) return null; //pomijamy samego siebie

            return (
              <UserCard
                key={allUser.userId}
                relationshipStatus={getRelationshipStatus(allUser.userId)}
                {...allUser}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
