import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";

export default function InviteIdParams({
  invitedId,
}: {
  invitedId: Id<"invitations">;
}) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const invitation = useQuery(
    api.queries.getInvitationsForUser,
    user ? { userId: user.id } : "skip"
  );

  const acceptInvitation = useMutation(api.mutations.acceptInvitation);

  if (!isLoaded || !user) {
    return <p>Loading...</p>;
  }

  const currentInvitation = invitation?.find((inv) => inv._id === invitedId);

  if (!currentInvitation) {
    return (
      <p className="text-red-500">
        A request does not exists or it is sent already.
      </p>
    );
  }

  const handleAccept = async () => {
    await acceptInvitation({ inviteId: invitedId });
    router.push("/social/profile");
  };

  return (
    <div className="">
      <h1>Requests from friends</h1>
      <p>
        You have got a request from friend with ID: {currentInvitation.senderId}
      </p>
      <button
        className="mt-4 bg-green-500 text-white py-2 px-4 hover:bg-green-600"
        onClick={handleAccept}
      >
        Accept
      </button>
    </div>
  );
}
