import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { userSchema } from "../validations/userSchema";
import { Id } from "../_generated/dataModel";

export const createUser = mutation({
  args: v.object({
    clerkId: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    country: v.optional(v.string()),
    age: v.optional(v.float64()),
    description: v.optional(v.string()),
    status: v.optional(v.union(v.literal("online"), v.literal("offline"))),
    lastActive: v.optional(v.float64()),
  }),

  handler: async (ctx, args) => {
    try {
      const validateData = userSchema.parse({
        clerkId: args.clerkId,
        name: args.name,
        email: args.email,
        age: args.age,
        description: args.description,
        country: args.country,
        status: args.status,
        lastActive: args.lastActive,
      });

      const existingUser = await ctx.db
        .query("users")
        .withIndex("by_clerkId", (q) => q.eq("clerkId", validateData.clerkId))
        .unique();

      if (existingUser) {
        console.log("User already exists", existingUser._id);
        return { success: false, message: "User already exists" };
      }

      const userId = await ctx.db.insert("users", validateData);

      return { success: true, userId };
    } catch (error) {
      return { success: false, message: "Failed to create user" };
    }
  },
});

export const updateUserProfile = mutation({
  args: v.object({
    clerkId: v.string(),
    name: v.optional(v.string()),
    country: v.optional(v.string()),
    age: v.optional(v.float64()),
    description: v.optional(v.string()),
    lastActive: v.optional(v.float64()),
  }),
  handler: async (ctx, args) => {
    try {
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
        .unique();

      if (!user) {
        throw new Error("User does not exist.");
      }
      const validateUser = userSchema.parse({
        clerkId: args.clerkId,
        name: args.name,
        country: args.country,
        age: args.age,
        description: args.description,
        lastActive: args.lastActive ?? Date.now(),
      });
      const userId: Id<"users"> = user._id;

      await ctx.db.patch(userId, validateUser);

      console.log("Profile updated:", userId);
      return { success: true, message: "Profile updated" };
    } catch (error) {
      return { success: false, message: "Failed to update user" };
    }
  },
});

export const setUserStatus = mutation({
  args: v.object({
    clerkId: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    country: v.optional(v.string()),
    age: v.optional(v.float64()),
    description: v.optional(v.string()),
    status: v.optional(v.union(v.literal("online"), v.literal("offline"))),
    lastActive: v.optional(v.float64()),
  }),

  handler: async (ctx, args) => {
    console.log(`Zmiana statusu: ${args.clerkId} => ${args.status}`);
    try {
      const validateUser = userSchema.parse(args);

      const user = await ctx.db
        .query("users")
        .withIndex("by_clerkId", (q) => q.eq("clerkId", validateUser.clerkId))
        .unique();

      if (!user) {
        console.error(`User with clerkId ${validateUser.clerkId} not found.`);
        return;
      }

      const userId: Id<"users"> = user._id;

      await ctx.db.patch(userId, {
        status: validateUser.status,
        lastActive: Date.now(),
      });

      console.log("Status zmieniony");
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  },
});
