import { v } from "convex/values";
import { query } from "../_generated/server";

export const getIncomingFriendRequests = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }) => {
    // Zapytanie pobiera rekordy, gdzie zalogowany user jest odbiorcą (friendId) i status to "pending"
    const requests = await ctx.db
      .query("friends")
      .filter((q) => q.eq(q.field("friendId"), userId))
      .filter((q) => q.eq(q.field("status"), "pending"))
      .collect();

    return requests;
  },
});
