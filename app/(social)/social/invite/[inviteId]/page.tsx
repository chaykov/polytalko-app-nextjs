import { Id } from "@/convex/_generated/dataModel";
import InviteIdParams from "./InviteIdParams";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ inviteId: Id<"invitations"> }>;
}) {
  const invitedId = await params;

  return (
    <div className="">
      <InviteIdParams invitedId={invitedId.inviteId} />
    </div>
  );
}
