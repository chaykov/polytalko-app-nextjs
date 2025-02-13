import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Podczas logowania zapisz dane uzytkownika w bazie danych, w przeciwnym razie istniejacego nic nie rob.
export const saveUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    isOnline: v.boolean(),
    sessionId: v.optional(v.string()),
    country: v.optional(v.string()),
    age: v.optional(v.number()),
    description: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { userId, name, email, isOnline, sessionId, country, age, description }
  ) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity || identity.subject !== userId) {
      throw new Error("Unauthorized");
    }

    if (!email.includes("@")) {
      throw new Error("Invalid email address");
    }

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (existingUser) {
      if (!existingUser.isOnline) {
        await ctx.db.patch(existingUser._id, {
          isOnline,
          sessionId,
        });
        console.log("Zmieniony status na online");
      }
    } else {
      await ctx.db.insert("users", {
        userId,
        name,
        email,
        isOnline,
        sessionId: sessionId ?? "",
        createdAt: Date.now(),
        country,
        age,
        description,
      });
      console.log("Utworzony nowy user");
    }
  },
});

// Zaaktualizuj profil w bazie danych poprzez edytora profili
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
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (!user) return;

    const updatedFields: Record<string, unknown> = {};
    if (name !== undefined) updatedFields.name = name;
    if (country !== undefined) updatedFields.country = country;
    if (age !== undefined) updatedFields.age = age;
    if (description !== undefined) updatedFields.description = description;

    if (Object.keys(updatedFields).length > 0) {
      await ctx.db.patch(user?._id, updatedFields);
    }
  },
});

// Dodaj wybranego uzytkownika do wspolnych znajomych, lecz ten "zaproszony uzytkownik - pending" musi zaakceptowac Twoje zaproszenie.
export const addFriend = mutation({
  args: {
    userId: v.string(),
    friendId: v.string(),
  },
  handler: async (ctx, { userId, friendId }) => {
    const existingFriend = await ctx.db
      .query("friends")
      .withIndex("by_userId", (q) =>
        q.eq("userId", userId).eq("friendId", friendId)
      )
      .first();

    if (!existingFriend) {
      await ctx.db.insert("friends", {
        userId,
        friendId,
        status: "pending",
        createdAt: Date.now(),
      });
    } else {
      throw new Error("Friend request already exists.");
    }
  },
});

// 📌 Dodawanie znajomego (wysłanie zaproszenia)
// export const addFriend = mutation({
//   args: {
//     userId: v.string(),
//     friendId: v.string(),
//   },
//   handler: async (ctx, { userId, friendId }) => {
//     // Sprawdzamy, czy zaproszenie już istnieje
//     const existingFriendship = await ctx.db
//       .query("friends")
//       .withIndex("by_userId", (q) =>
//         q.eq("userId", userId).eq("friendId", friendId)
//       )
//       .first();

//     if (!existingFriendship) {
//       await ctx.db.insert("friends", {
//         userId,
//         friendId,
//         status: "pending",
//         createdAt: Date.now(),
//       });
//     }
//   },
// });

// 📌 Akceptowanie znajomego
export const acceptFriend = mutation({
  args: {
    userId: v.string(),
    friendId: v.string(),
  },
  handler: async (ctx, { userId, friendId }) => {
    // Znajdź istniejące zaproszenie do znajomych
    const friendship = await ctx.db
      .query("friends")
      .withIndex("by_userId", (q) =>
        q.eq("userId", friendId).eq("friendId", userId)
      )
      .first();

    if (friendship) {
      // Aktualizujemy status znajomości
      await ctx.db.patch(friendship._id, { status: "accepted" });

      // Tworzymy relację w drugą stronę (dwustronna znajomość)
      await ctx.db.insert("friends", {
        userId,
        friendId,
        status: "accepted",
        createdAt: Date.now(),
      });
    }
  },
});

// 📌 Usuwanie znajomego
export const removeFriend = mutation({
  args: {
    userId: v.string(),
    friendId: v.string(),
  },
  handler: async (ctx, { userId, friendId }) => {
    const friendships = await ctx.db
      .query("friends")
      .withIndex("by_userId", (q) =>
        q.eq("userId", userId).eq("friendId", friendId)
      )
      .collect();

    await Promise.all(friendships.map((f) => ctx.db.delete(f._id)));
  },
});
