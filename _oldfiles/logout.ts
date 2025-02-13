import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const setOffline = mutation({
  args: {
    userId: v.string(),
    sessionId: v.optional(v.string()),
  },
  handler: async (ctx, { userId, sessionId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (user) {
      await ctx.db.patch(user._id, {
        isOnline: false,
        sessionId: sessionId ?? "",
      });
      console.log("Wylogowany i zmieniony na false");
    }
  },
});
