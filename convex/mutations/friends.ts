import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { Doc } from "../_generated/dataModel";

type Friends = Doc<"friends">;

export const addFriend = mutation({
  args: {
    userId: v.string(),
    friendId: v.string(),
  },

  handler: async (ctx, { userId, friendId }) => {
    const existing = (await ctx.db
      .query("friends")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("friendId"), friendId))
      .first()) as Friends;

    if (!existing) {
      await ctx.db.insert("friends", {
        userId,
        friendId,
        status: "pending",
        createdAt: Date.now(),
      });
    }
  },
});

export const acceptFriendRequest = mutation({
  args: {
    userId: v.string(),
    friendId: v.string(),
  },
  handler: async (ctx, { userId, friendId }) => {
    const request = (await ctx.db
      .query("friends")
      .filter((q) => q.eq(q.field("userId"), friendId))
      .filter((q) => q.eq(q.field("friendId"), userId))
      .first()) as Friends;

    if (request && request.status === "pending") {
      await ctx.db.patch(request._id, { status: "accepted" });
      await ctx.db.insert("friends", {
        userId,
        friendId,
        status: "accepted",
        createdAt: Date.now(),
      });
    }
  },
});
