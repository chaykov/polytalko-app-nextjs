import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const sendFriendRequest = mutation({
  args: {
    clerkIdA: v.string(),
    clerkIdB: v.string(),
  },

  handler: async (ctx, { clerkIdA, clerkIdB }) => {
    if (clerkIdA === clerkIdB) {
      throw new Error("Cannot send friend request to yourself.");
    }

    const userA = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkIdA))
      .unique();

    const userB = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkIdB))
      .unique();

    if (!userA || !userB) {
      throw new Error("User not found.");
    }

    const [existingA, existingB] = await Promise.all([
      ctx.db
        .query("friends")
        .withIndex("by_users", (q) =>
          q.eq("userA", userA._id).eq("userB", userB._id)
        )
        .unique(),
      ctx.db
        .query("friends")
        .withIndex("by_users", (q) =>
          q.eq("userA", userB._id).eq("userB", userA._id)
        )
        .unique(),
    ]);

    const existing = existingA || existingB;

    if (existing) {
      throw new Error("Friend request already exists.");
    }

    await ctx.db.insert("friends", {
      userA: userA._id,
      userB: userB._id,
      status: "pending",
      createdAt: Date.now(),
    });

    console.log(`Request sent: ${userA._id} => ${userB._id}`);
  },
});

export const acceptFriendRequest = mutation({
  args: {
    clerkIdA: v.string(),
    clerkIdB: v.string(),
  },
  handler: async (ctx, { clerkIdA, clerkIdB }) => {
    const userA = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkIdA))
      .unique();

    const userB = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkIdB))
      .unique();

    if (!userA || !userB) {
      throw new Error("User not found.");
    }

    const request = await ctx.db
      .query("friends")
      .withIndex("by_users", (q) =>
        q.eq("userA", userA._id).eq("userB", userB._id)
      )
      .unique();

    if (!request || request.status !== "pending") {
      throw new Error("No pending friend request found.");
    }

    await ctx.db.patch(request._id, { status: "accepted" });

    console.log(`Request accepted: ${userA._id} => ${userB._id}`);
  },
});

export const rejectFriendRequest = mutation({
  args: {
    clerkIdA: v.string(),
    clerkIdB: v.string(),
  },

  handler: async (ctx, { clerkIdA, clerkIdB }) => {
    const userA = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkIdA))
      .unique();

    const userB = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkIdB))
      .unique();

    if (!userA || !userB) {
      throw new Error("User not found.");
    }

    const request = await ctx.db
      .query("friends")
      .withIndex("by_users", (q) =>
        q.eq("userA", userA._id).eq("userB", userB._id)
      )
      .unique();

    if (!request) {
      throw new Error("No pending friend request found.");
    }

    await ctx.db.patch(request._id, {
      status: "removed",
      deletedAt: Date.now(),
    });
  },
});

export const cancelFriendRequest = mutation({
  args: {
    clerkIdA: v.string(),
    clerkIdB: v.string(),
  },

  handler: async (ctx, { clerkIdA, clerkIdB }) => {
    const userA = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkIdA))
      .unique();

    const userB = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkIdB))
      .unique();

    if (!userA || !userB) {
      throw new Error("User not found.");
    }

    const request = await ctx.db
      .query("friends")
      .withIndex("by_users", (q) =>
        q.eq("userA", userA._id).eq("userB", userB._id)
      )
      .unique();

    if (!request) {
      throw new Error("No pending friend request found.");
    }

    await ctx.db.delete(request._id);

    console.log(`Request canceled: ${userA._id} => ${userB._id}`);
  },
});

export const removeFriendRequest = mutation({
  args: {
    clerkIdA: v.string(),
    clerkIdB: v.string(),
  },

  handler: async (ctx, { clerkIdA, clerkIdB }) => {
    const userA = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkIdA))
      .unique();

    const userB = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkIdB))
      .unique();

    if (!userA || !userB) {
      throw new Error("User not found.");
    }

    const friendship = await ctx.db
      .query("friends")
      .withIndex("by_users", (q) =>
        q.eq("userA", userA._id).eq("userB", userB._id)
      )
      .unique();

    if (!friendship) {
      throw new Error("No friendship found.");
    }

    await ctx.db.delete(friendship._id);
  },
});
