import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const acceptFriend = mutation({
  args: {
    userId: v.string(),
    friendId: v.string(),
  },
  handler: async (ctx, { userId, friendId }) => {
    const friendship = await ctx.db
      .query("friends")
      .filter((q) => q.eq(q.field("friendId"), userId))
      .filter((q) => q.eq(q.field("userId"), friendId))
      .filter((q) => q.eq(q.field("status"), "pending"))
      .unique();

    if (!friendship) {
      throw new Error("Friendshop not found or already processed.");
    }

    await ctx.db.patch(friendship._id, { status: "accepted" });
  },
});
