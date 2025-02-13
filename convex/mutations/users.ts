import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { Doc } from "../_generated/dataModel";

type User = Doc<"users">;

export const createNewUser = mutation({
  args: {
    userId: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, { userId, name, email }) => {
    const existingUser = (await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first()) as User;

    if (!existingUser) {
      await ctx.db.insert("users", {
        userId,
        name: name || "Unknown",
        email: email || "",
        country: "",
        age: undefined,
        description: "",
        createdAt: Date.now(),
      });
    }
  },
});
