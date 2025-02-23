import { v } from "convex/values";
import { query } from "../_generated/server";
// import { Doc } from "../_generated/dataModel";

// type User = Doc<"users">;
// type Friends = Doc<"friends">;

// OPCJA 1 - getUserProfile
// export const getUserProfile = query({
//   args: {
//     clerkId: v.string(),
//   },

//   handler: async (ctx, { clerkId }) => {
//     return await ctx.db
//       .query("users")
//       .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
//       .unique();
//   },
// });

// OPCJA 2 - getUserProfile
export const getUserProfile = query({
  args: v.object({
    clerkId: v.string(),
  }),

  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      return null;
    }

    return user;
  },
});

// OPCJA 1 - getAllUsers
// export const getAllUsers = query({
//   args: { clerkId: v.string() },
//   handler: async (ctx, { clerkId }) => {
//     const users = await ctx.db
//       .query("users")
//       .withIndex("by_clerkId", (q) => q)
//       .collect();

//     return users
//       .filter((user) => user.clerkId !== clerkId)
//       .map(({ clerkId, name, email, status }) => ({
//         clerkId,
//         name,
//         email,
//         status,
//       }));
//   },
// });

// OPCJA 2 - getAllUsers
export const getAllUsers = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").take(10);

    return users;
  },
});
