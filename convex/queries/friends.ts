import { v } from "convex/values";
import { query } from "../_generated/server";

export const getPendingRequests = query({
  args: { clerkId: v.string() },

  handler: async (ctx, { clerkId }) => {
    console.log("🔍 Sprawdzamy zaproszenia dla:", clerkId);

    // 🔍 Pobieramy `_id` zalogowanego użytkownika na podstawie `clerkId`
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();

    if (!user) {
      throw new Error("⚠️ User not found.");
    }

    console.log("✅ Znaleziono użytkownika:", user._id);

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
        const sender = await ctx.db
          .query("users")
          .withIndex("by_id", (q) => q.eq("_id", req.userA)) // 🔥 To prawdopodobnie powodowało błąd
          .unique();

        if (!sender) {
          console.log(
            "⚠️ Użytkownik A nie został znaleziony w bazie!",
            req.userA
          );
          return null; // 🚨 Ignorujemy ten wpis, aby uniknąć błędu
        }

        return {
          _id: req._id,
          clerkIdA: sender.clerkId, // ✅ Nadawca zaproszenia (przekształcony z `_id` na `clerkId`)
          clerkIdB: clerkId, // ✅ Zalogowany użytkownik
        };
      })
    ).then((results) => results.filter(Boolean)); // 🔥 Usuwamy `null` wpisy, jeśli jakiś użytkownik A nie istnieje
  },
});

export const getPendingRequestsCount = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    // 🔍 Pobieramy `_id` zalogowanego użytkownika na podstawie `clerkId`
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .unique();

    if (!user) {
      throw new Error("⚠️ User not found.");
    }

    const pendingRequestsCount = await ctx.db
      .query("friends")
      .withIndex("by_userB", (q) =>
        q.eq("userB", user._id).eq("status", "pending")
      )
      .collect();

    return pendingRequestsCount.length;
  },
});
