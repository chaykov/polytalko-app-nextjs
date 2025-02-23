import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    bio: v.optional(v.string()),
    country: v.optional(v.string()),
    age: v.optional(v.number()),
    lastSeen: v.number(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_lastSeen", ["lastSeen"]),

  invitations: defineTable({
    senderId: v.string(),
    recipientId: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("rejected")
    ),
    createdAt: v.number(),
  })
    .index("by_senderId", ["senderId"])
    .index("by_recipientId", ["recipientId"]),
});
