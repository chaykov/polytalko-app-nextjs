import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    isOnline: v.boolean(),
    sessionId: v.string(),
    createdAt: v.float64(),

    country: v.optional(v.string()),
    age: v.optional(v.number()),
    description: v.optional(v.string()),
  }).index("by_userId", ["userId"]),

  friends: defineTable({
    userId: v.string(),
    friendId: v.string(),
    status: v.string(),
    createdAt: v.float64(),
  }).index("by_userId", ["userId", "friendId"]),
});
