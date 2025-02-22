import { v } from "convex/values";
import { mutation } from "../_generated/server";
// import { Doc } from "../_generated/dataModel";

// type Friends = Doc<"friends">;

// export const addFriend = mutation({
//   args: {
//     userId: v.string(),
//     friendId: v.string(),
//   },

//   handler: async (ctx, { userId, friendId }) => {
//     const existing = (await ctx.db
//       .query("friends")
//       .filter((q) => q.eq(q.field("userId"), userId))
//       .filter((q) => q.eq(q.field("friendId"), friendId))
//       .first()) as Friends;

//     if (!existing) {
//       await ctx.db.insert("friends", {
//         userId,
//         friendId,
//         status: "pending",
//         createdAt: Date.now(),
//       });
//     }
//   },
// });

// export const addFriend = mutation({
//   args: {
//     userId: v.string(),
//     friendId: v.string(),
//   },

//   handler: async (ctx, { userId, friendId }) => {
//     // Sprawdzamy, czy relacja juz istnieje (w obie strony)
//     const existingUserA = (await ctx.db
//       .query("friends")
//       .filter((q) => q.eq(q.field("userId"), userId))
//       .filter((q) => q.eq(q.field("friendId"), friendId))
//       .first()) as Friends;

//     const existingUserB = (await ctx.db
//       .query("friends")
//       .filter((q) => q.eq(q.field("userId"), friendId))
//       .filter((q) => q.eq(q.field("friendId"), userId))
//       .first()) as Friends;

//     if (!existingUserA) {
//       // Tworzymy wpis dla uzytkownika A
//       await ctx.db.insert("friends", {
//         userId,
//         friendId,
//         status: "pending",
//         createdAt: Date.now(),
//       });
//     }

//     if (!existingUserB) {
//       // Tworzymy wpis dla uzytkownika B
//       await ctx.db.insert("friends", {
//         userId: friendId,
//         friendId: userId,
//         status: "pending",
//         createdAt: Date.now(),
//       });
//     }
//   },
// });

// export const acceptFriendRequest = mutation({
//   args: {
//     userId: v.string(),
//     friendId: v.string(),
//   },
//   handler: async (ctx, { userId, friendId }) => {
//     // Szukamy istniejacego wpisu dla uzytkownika A
//     const existingUserA = (await ctx.db
//       .query("friends")
//       .filter((q) => q.eq(q.field("userId"), userId))
//       .filter((q) => q.eq(q.field("friendId"), friendId))
//       .filter((q) => q.eq(q.field("status"), "pending"))
//       .first()) as Friends;

//     // Szukamy istniejacego wpisu dla uzytkownika B
//     const existingUserB = (await ctx.db
//       .query("friends")
//       .filter((q) => q.eq(q.field("userId"), friendId))
//       .filter((q) => q.eq(q.field("friendId"), userId))
//       .filter((q) => q.eq(q.field("status"), "pending"))
//       .first()) as Friends;

//     if (!existingUserA || !existingUserB) {
//       throw new Error("No pending friend request found.");
//     }

//     if (existingUserA.userId === userId) {
//       await ctx.db.patch(existingUserA._id, { status: "accepted" });
//     }

//     if (existingUserB.userId === userId) {
//       await ctx.db.patch(existingUserB._id, { status: "accepted" });
//     }
//   },
// });

// export const acceptFriendRequest = mutation({
//   args: {
//     userId: v.string(),
//     friendId: v.string(),
//   },
//   handler: async (ctx, { userId, friendId }) => {
//     const request = (await ctx.db
//       .query("friends")
//       .filter((q) => q.eq(q.field("userId"), friendId))
//       .filter((q) => q.eq(q.field("friendId"), userId))
//       .filter((q) => q.eq(q.field("status"), "pending"))
//       .first()) as Friends;

//     if (!request) {
//       throw new Error("No pending friend request found");
//     }

//     //Akceptujemy istniejaca znajomosc
//     await ctx.db.patch(request._id, { status: "accepted" });

//     // Tworzymy drugi wpis w bazie aby znajomosc byla dwustronna
//     await ctx.db.insert("friends", {
//       userId,
//       friendId,
//       status: "accepted",
//       createdAt: Date.now(),
//     });
//   },
// });

export const sendFriendRequest = mutation({
  args: {
    clerkIdA: v.string(),
    clerkIdB: v.string(),
  },

  handler: async (ctx, { clerkIdA, clerkIdB }) => {
    if (clerkIdA === clerkIdB) {
      throw new Error("Cannot send friend request to yourself.");
    }

    const userA = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkIdA))
      .unique();

    const userB = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkIdB))
      .unique();

    if (!userA || !userB) {
      throw new Error("User not found.");
    }

    const existing = await ctx.db
      .query("friends")
      .withIndex("by_users", (q) =>
        q.eq("userA", userA._id).eq("userB", userB._id)
      )
      .unique();

    if (existing) {
      throw new Error("Friend request already exists.");
    }

    await ctx.db.insert("friends", {
      userA: userA._id,
      userB: userB._id,
      status: "pending",
      createdAt: Date.now(),
    });

    console.log(`Request sent: ${userA._id} => ${userB._id}`);
  },
});

export const acceptFriendRequest = mutation({
  args: {
    clerkIdA: v.string(),
    clerkIdB: v.string(),
  },
  handler: async (ctx, { clerkIdA, clerkIdB }) => {
    const userA = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkIdA))
      .unique();

    const userB = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkIdB))
      .unique();

    if (!userA || !userB) {
      throw new Error("User not found.");
    }

    const request = await ctx.db
      .query("friends")
      .withIndex("by_users", (q) =>
        q.eq("userA", userA._id).eq("userB", userB._id)
      )
      .unique();

    if (!request || request.status !== "pending") {
      throw new Error("No pending friend request found.");
    }

    await ctx.db.patch(request._id, { status: "accepted" });

    console.log(`Request accepted: ${userA._id} => ${userB._id}`);
  },
});

export const rejectFriendRequest = mutation({
  args: {
    clerkIdA: v.string(),
    clerkIdB: v.string(),
  },

  handler: async (ctx, { clerkIdA, clerkIdB }) => {
    const userA = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkIdA))
      .unique();

    const userB = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkIdB))
      .unique();

    if (!userA || !userB) {
      throw new Error("User not found.");
    }

    const request = await ctx.db
      .query("friends")
      .withIndex("by_users", (q) =>
        q.eq("userA", userA._id).eq("userB", userB._id)
      )
      .unique();

    if (!request) {
      throw new Error("No pending friend request found.");
    }

    await ctx.db.patch(request._id, {
      status: "removed",
      deletedAt: Date.now(),
    });
  },
});

export const cancelFriendRequest = mutation({
  args: {
    clerkIdA: v.string(),
    clerkIdB: v.string(),
  },

  handler: async (ctx, { clerkIdA, clerkIdB }) => {
    const userA = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkIdA))
      .unique();

    const userB = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkIdB))
      .unique();

    if (!userA || !userB) {
      throw new Error("User not found.");
    }

    const request = await ctx.db
      .query("friends")
      .withIndex("by_users", (q) =>
        q.eq("userA", userA._id).eq("userB", userB._id)
      )
      .unique();

    if (!request) {
      throw new Error("No pending friend request found.");
    }

    await ctx.db.delete(request._id);

    console.log(`Request canceled: ${userA._id} => ${userB._id}`);
  },
});
