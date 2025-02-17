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

// export const acceptFriend = mutation({
//   args: {
//     userId: v.string(),
//     friendId: v.string(),
//   },
//   handler: async (ctx, { userId, friendId }) => {
//     const friendship = await ctx.db
//       .query("friends")
//       .filter((q) => q.eq(q.field("friendId"), userId))
//       .filter((q) => q.eq(q.field("userId"), friendId))
//       .filter((q) => q.eq(q.field("status"), "pending"))
//       .unique();

//     if (!friendship) {
//       throw new Error("Friendshop not found or already processed.");
//     }

//     await ctx.db.patch(friendship._id, { status: "accepted" });
//   },
// });

// Zaaktualizuj profil w bazie danych poprzez edytora profili
// export const updateUserProfile = mutation({
//   args: {
//     userId: v.string(),
//     name: v.optional(v.string()),
//     country: v.optional(v.string()),
//     age: v.optional(v.number()),
//     description: v.optional(v.string()),
//   },
//   handler: async (ctx, { userId, name, country, age, description }) => {
//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_userId", (q) => q.eq("userId", userId))
//       .first();

//     if (!user) return;

//     const updatedFields: Record<string, unknown> = {};
//     if (name !== undefined) updatedFields.name = name;
//     if (country !== undefined) updatedFields.country = country;
//     if (age !== undefined) updatedFields.age = age;
//     if (description !== undefined) updatedFields.description = description;

//     if (Object.keys(updatedFields).length > 0) {
//       await ctx.db.patch(user?._id, updatedFields);
//     }
//   },
// });

export const updateUserProfile = mutation({
  args: {
    userId: v.string(),
    name: v.optional(v.string()),
    country: v.optional(v.string()),
    age: v.optional(v.number()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, { userId, name, country, age, description }) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, { name, country, age, description });
  },
});
