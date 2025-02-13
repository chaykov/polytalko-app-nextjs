import { v } from "convex/values";
import { query } from "../_generated/server";

export const getAcceptedFriends = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    // Pobieramy dwie grupy - gdzie zalogowany user jest inicjatorem lub odbiorcą, a status jest "accepted"
    const sent = await ctx.db
      .query("friends")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("status"), "accepted"))
      .collect();

    const received = await ctx.db
      .query("friends")
      .filter((q) => q.eq(q.field("friendId"), userId))
      .filter((q) => q.eq(q.field("status"), "accepted"))
      .collect();

    return [...sent, ...received];
  },
});
