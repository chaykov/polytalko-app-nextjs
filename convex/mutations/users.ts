import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
  },

  handler: async (ctx, { clerkId, name, email }) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();

    if (existingUser) return; // Jeśli uzytkownik jest juz w bazie danych, wtedy nie dodajemy.

    await ctx.db.insert("users", {
      clerkId,
      name,
      email,
      country: "No country",
      age: 0,
      description: "Empty description",
      status: "online",
      lastActive: Date.now(),
    });
  },
});

export const updateUserProfile = mutation({
  args: {
    clerkId: v.string(),
    name: v.optional(v.string()),
    country: v.optional(v.string()),
    age: v.optional(v.number()),
    description: v.optional(v.string()),
  },

  handler: async (ctx, { clerkId, name, country, age, description }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();

    if (!user) {
      throw new Error("User does not exist.");
    }

    await ctx.db.patch(user._id, {
      name: name ?? user.name,
      country: country ?? user.country,
      age: age ?? user.age,
      description: description ?? user.description,
    });
  },
});

export const setUserStatus = mutation({
  args: {
    clerkId: v.string(),
    status: v.union(v.literal("online"), v.literal("offline")),
  },

  handler: async (ctx, { clerkId, status }) => {
    console.log(`Zmiana statusu: ${clerkId} => ${status}`);
    try {
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
        .unique();

      if (!user) {
        console.error(`User with clerkId ${clerkId} not found.`);
        return;
      }

      await ctx.db.patch(user._id, {
        status,
        lastActive: Date.now(),
      });

      console.log("Status zmieniony");
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  },
});
