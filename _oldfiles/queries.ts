import { v } from "convex/values";
import { query } from "./_generated/server";

// Pobieranie cały profil uzytkownika
export const getUserProfile = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }) => {
    const user = ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    return user;
  },
});

// // Pobieranie dostępnych znajomych przez uzytkownika:
// export const getUserFriends = query({
//   args: {
//     userId: v.string(),
//   },
//   handler: async (ctx, { userId }) => {
//     const friendsEntries = await ctx.db
//       .query("friends")
//       .filter((q) => q.eq("userId", userId))
//       .collect();

//     const friendsData = await Promise.all(
//       friendsEntries.map((entry) => {
//         ctx.db
//           .query("users")
//           .filter((q) => q.eq(q.field("userId"), entry.friendId));
//       })
//     );

//     return friendsData.filter((friend) => friend !== null);
//   },
// });

// export const getFriendsWithData = query({
//   args: { userId: v.string() },
//   handler: async (ctx, { userId }) => {
//     const friends = await ctx.db
//       .query("friends")
//       .withIndex("by_userId", (q) => q.eq("userId", userId))
//       .collect();

//     const friendsWithData = await Promise.all(
//       friends.map(async (friend) => {
//         const user = await ctx.db
//           .query("users")
//           .withIndex("by_userId", (q) => q.eq("userId", friend.friendId))
//           .first();

//         return {
//           friendId: friend?.friendId,
//           name: user?.name || "Unknown",
//           age: user?.age,
//           country: user?.country,
//           description: user?.description,
//           createdAt: user?.createdAt,
//           isOnlone: user?.isOnline,
//         };
//       })
//     );

//     return friendsWithData;
//   },
// });

// 📌Pobieranie listy znajomych (z danymi użytkowników)
export const getFriendsWithNames = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const friends = await ctx.db
      .query("friends")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    const friendsWithData = await Promise.all(
      friends.map(async (friend) => {
        const user = await ctx.db
          .query("users")
          .withIndex("by_userId", (q) => q.eq("userId", friend.friendId))
          .first();

        return {
          friendId: friend.friendId,
          name: user?.name || "Unknown",
          age: user?.age ?? null, // albo uzyc undefined jesli wyskoczy blad
          country: user?.country || "Unknown",
          status: friend.status, // Dodajemy status relacji
        };
      })
    );

    return friendsWithData;
  },
});

// 📌 Pobieranie wszystkich użytkowników (widocznych)
export const getAllUsers = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.neq("userId", userId)) // Nie pokazujemy siebie samego
      .collect();
  },
});
