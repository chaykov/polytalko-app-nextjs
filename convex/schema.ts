import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    country: v.optional(v.string()),
    age: v.optional(v.number()),
    description: v.optional(v.string()),
    createdAt: v.number(), // Timestamp
  }).index("by_userId", ["userId"]),

  friends: defineTable({
    userId: v.string(),
    friendId: v.string(),
    status: v.union(v.literal("pending"), v.literal("accepted")),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
});
