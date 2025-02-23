import { v } from "convex/values";
import { query } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import {
  getFriendsAcceptedListSchema,
  getFriendsListSchema,
  getPendingRequestsCountSchema,
  getPendingRequestsSchema,
  pendingRequestSchema,
} from "../validations/friendSchema";

// z walidacją Zod sprawdzamy, czy `clerkId` jest przekazane
export const getPendingRequests = query({
  args: v.object({
    clerkId: v.string(),
  }),

  handler: async (ctx, args) => {
    const { clerkId } = getPendingRequestsSchema.parse(args);
    console.log("🔍 Sprawdzamy zaproszenia dla:", clerkId);

    // 🔍 Pobieramy `_id` zalogowanego użytkownika na podstawie `clerkId`
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();

    if (!user) {
      throw new Error("⚠️ User not found.");
    }
    const userId: Id<"users"> = user._id;
    console.log("✅ Znaleziono użytkownika:", userId);

    // 🔍 Pobieramy zaproszenia `pending`
    const requests = await ctx.db
      .query("friends")
      .withIndex("by_userB", (q) =>
        q.eq("userB", user._id).eq("status", "pending")
      )
      .collect();

    console.log("📌 Znalezione zaproszenia:", requests);

    return await Promise.all(
      requests.map(async (req) => {
        console.log("🔍 Pobieramy dane użytkownika A:", req.userA);

        // 🔥 Pobieramy `_id` z Convex dla użytkownika `userA`
        const sender = await ctx.db.get(req.userA);

        if (!sender) {
          console.log(
            "⚠️ Użytkownik A nie został znaleziony w bazie!",
            req.userA
          );
          return null; // 🚨 Ignorujemy ten wpis, aby uniknąć błędu
        }

        return pendingRequestSchema.parse({
          _id: req._id,
          clerkIdA: sender.clerkId,
          clerkIdB: clerkId,
        });
      })
    ).then((results) => results.filter(Boolean));
  },
});

// z walidacją Zod sprawdzamy, czy `clerkId` jest przekazane
export const getPendingRequestsCount = query({
  args: v.object({
    clerkId: v.string(),
  }),

  handler: async (ctx, args) => {
    const { clerkId } = getPendingRequestsCountSchema.parse(args);

    // 🔍 Pobieramy `_id` zalogowanego użytkownika na podstawie `clerkId`
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();

    if (!user) {
      return { count: 0 };
    }

    const userId: Id<"users"> = user._id;

    // 🔍 Pobieramy liczbę zaproszeń `pending`
    const count = await ctx.db
      .query("friends")
      .withIndex("by_userB", (q) =>
        q.eq("userB", userId).eq("status", "pending")
      )
      .collect();

    return { count };
  },
});

// z walidacją Zod sprawdzamy, czy `clerkId` jest przekazane
export const getFriendsAcceptedList = query({
  args: v.object({
    clerkId: v.string(),
  }),

  handler: async (ctx, args) => {
    const { clerkId } = getFriendsAcceptedListSchema.parse(args);
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();

    if (!user) {
      throw new Error("User not found.");
    }

    const userId: Id<"users"> = user._id;

    const friends = await ctx.db
      .query("friends")
      .withIndex("by_userB", (q) =>
        q.eq("userB", userId).eq("status", "accepted")
      )
      .collect();

    return await Promise.all(
      friends.map(async (req) => {
        const friend = await ctx.db.get(req.userA);
        if (!friend) return null;

        return {
          clerkId: friend.clerkId,
        };
      })
    ).then((results) => results.filter(Boolean));
  },
});

// z walidacją Zod sprawdzamy, czy `clerkId` jest przekazane
export const getFriendsList = query({
  args: v.object({
    clerkId: v.string(),
  }),

  handler: async (ctx, args) => {
    const { clerkId } = getFriendsListSchema.parse(args);

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();

    if (!user) {
      throw new Error("User not found.");
    }

    const userId: Id<"users"> = user._id;

    // 🔍 Pobieramy zaakceptowanych znajomych
    const friendsB = await ctx.db
      .query("friends")
      .withIndex("by_userB", (q) =>
        q.eq("userB", userId).eq("status", "accepted")
      )
      .collect();

    // 🔍 Pobieramy zaakceptowanych znajomych dla `userA` (kto wysłał zaproszenie)
    const friendsA = await ctx.db
      .query("friends")
      .withIndex("by_userA", (q) =>
        q.eq("userA", userId).eq("status", "accepted")
      )
      .collect();

    const allFriends = [...friendsA, ...friendsB];

    if (allFriends.length === 0) return [];

    return await Promise.all(
      allFriends.map(async (req) => {
        const friendId = req.userA === userId ? req.userB : req.userA;
        const friend = await ctx.db.get(friendId);
        if (!friend) return null;

        return { clerkId: friend.clerkId };
      })
    ).then((results) => results.filter(Boolean));
  },
});
