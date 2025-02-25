import { v } from "convex/values";
import { query } from "./_generated/server";

export const getUserProfile = query({
  args: { userId: v.string() },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.userId))
      .first();
  },
});

export const getAllUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getInvitationsForUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("invitations")
      .withIndex("by_recipientId", (q) => q.eq("recipientId", args.userId))
      .filter((q) => q.eq(q.field("status"), "pending"))
      .collect();
  },
});

export const checkFriendship = query({
  args: { userId1: v.string(), userId2: v.string() },
  handler: async (ctx, args) => {
    const relation = await ctx.db
      .query("invitations")
      .filter((q) =>
        q.or(
          q.and(
            q.eq(q.field("senderId"), args.userId1),
            q.eq(q.field("recipientId"), args.userId2)
          ),
          q.and(
            q.eq(q.field("senderId"), args.userId2),
            q.eq(q.field("recipientId"), args.userId1)
          )
        )
      )
      .filter((q) => q.eq(q.field("status"), "accepted"))
      .first();

    return { isFriends: !!relation };
  },
});

export const checkPendingInvitation = query({
  args: { userId1: v.string(), userId2: v.string() },
  handler: async (ctx, args) => {
    const pending = await ctx.db
      .query("invitations")
      .filter((q) =>
        q.or(
          q.and(
            q.eq(q.field("senderId"), args.userId1),
            q.eq(q.field("recipientId"), args.userId2)
          ),
          q.and(
            q.eq(q.field("senderId"), args.userId2),
            q.eq(q.field("recipientId"), args.userId1)
          )
        )
      )
      .filter((q) => q.eq(q.field("status"), "pending"))
      .first();

    return {
      hasPending: !!pending,
      isSender: pending ? pending.senderId === args.userId1 : false,
    };
  },
});
