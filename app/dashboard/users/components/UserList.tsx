import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import UserCard from "./UserCard";
import { getGravatarUrl } from "@/utils/getGravatarUrl";
import { MailPlus, UserPlus } from "lucide-react";

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
    // <div className="p-4 border rounded-lg shadow-md">
    //   <h3 className="mt-4 text-lg font-semibold">List of users:</h3>
    //   {allUsers?.length === 0 ? (
    //     <p>Loading...</p>
    //   ) : (
    //     <ul>
    //       {allUsers?.map((allUser) => {
    //         if (allUser.userId === userId) return null; //pomijamy samego siebie

    //         return (
    //           <UserCard
    //             key={allUser.userId}
    //             relationshipStatus={getRelationshipStatus(allUser.userId)}
    //             {...allUser}
    //           />
    //         );
    //       })}
    //     </ul>
    //   )}
    // </div>

    // Nowy wyglad dla users:

    <main className="p-4">
      {allUsers?.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allUsers?.map((user) => (
            <li
              key={user.userId}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-sm"
            >
              <div className="flex flex-1 flex-col p-8">
                <img
                  src={getGravatarUrl(user.email)}
                  alt={user.name || "User"}
                  className="mx-auto size-32 shrink-0 rounded-full"
                />
                <h3 className="mt-6 text-sm font-medium text-gray-900">
                  {user.name}
                </h3>
                <dl className="mt-1 flex grow flex-col justify-between">
                  <dt className="sr-only">Country</dt>
                  <dd className="text-sm text-gray-500">{user.country}</dd>
                  <dt className="sr-only">E-mail</dt>
                  <dd className="mt-3">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                      {user.email}
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <a
                      href="#"
                      className="hover:bg-green-100 hover:text-black/70 transition relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <UserPlus
                        aria-hidden="true"
                        className="size-5 text-green-500"
                      />
                      Add friend
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <a
                      href="#"
                      className="hover:bg-blue-100 hover:text-black/70 relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <MailPlus
                        aria-hidden="true"
                        className="size-5 text-blue-500"
                      />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
