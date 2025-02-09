import { v } from "convex/values";
import { query } from "./_generated/server";

// Pobieranie cały profil uzytkownika
export const getUserProfile = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }) => {
    const user = ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    return user;
  },
});

// Pobieranie dostępnych znajomych przez uzytkownika:
export const getUserFriends = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }) => {
    const friendsEntries = await ctx.db
      .query("friends")
      .filter((q) => q.eq("userId", userId))
      .collect();

    const friendsData = await Promise.all(
      friendsEntries.map((entry) => {
        ctx.db
          .query("users")
          .filter((q) => q.eq(q.field("userId"), entry.friendId));
      })
    );

    return friendsData.filter((friend) => friend !== null);
  },
});
