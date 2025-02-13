import { v } from "convex/values";
import { query } from "../_generated/server";
import { Doc } from "../_generated/dataModel";

type User = Doc<"users">;
type Friends = Doc<"friends">;

// Pobieranie dane uzytkownika (siebie)
export const getUserById = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    if (!userId) return null;

    return (await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first()) as User;
  },
});

// Pobieranie wszystkich uzytkownikow w bazie danych
export const getAllUsers = query({
  handler: async (ctx, {}) => {
    return (await ctx.db.query("users").collect()) as User[];
  },
});

// Pobieranie wszystkich uzytkownikow (zaakceptowanych) w znajomych uzytkownika
export const getUserFriends = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }) => {
    return (await ctx.db
      .query("friends")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("status"), "accepted"))
      .collect()) as Friends[];
  },
});
