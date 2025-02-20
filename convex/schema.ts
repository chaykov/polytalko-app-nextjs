import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    country: v.string(),
    age: v.number(),
    description: v.string(),
    status: v.union(
      v.literal("online"),
      v.literal("offline"),
      v.literal("away")
    ),
    lastActive: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_lastActive", ["lastActive"])
    .index("by_clerkId", ["clerkId"]),

  friends: defineTable({
    userA: v.id("users"),
    userB: v.id("users"),
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("blocked"),
      v.literal("removed")
    ),
    createdAt: v.number(),
    deletedAt: v.optional(v.number()),
  })
    .index("by_users", ["userA", "userB"])
    .index("by_userB", ["userB"]),
});
