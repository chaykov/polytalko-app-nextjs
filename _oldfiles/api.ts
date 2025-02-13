import { v } from "convex/values";
import { query } from "./_generated/server";

export const getFriends = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }) => {
    const friends = (
      await ctx.db
        .query("friends")
        .filter((q) => q.eq("userId", userId))
        .collect()
    ).reverse();

    return friends.map((friend) => friend.friendId);
  },
});
