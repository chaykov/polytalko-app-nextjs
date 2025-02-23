import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    bio: v.optional(v.string()),
    age: v.optional(v.number()),
    country: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (!existingUser) {
      await ctx.db.insert("users", {
        clerkId: args.clerkId,
        name: args.name,
        bio: args.bio,
        age: args.age,
        country: args.country,
        lastSeen: Date.now(),
      });
    }
  },
});

export const updateUserProfile = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    bio: v.optional(v.string()),
    age: v.optional(v.number()),
    country: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        bio: args.bio,
        age: args.age,
        country: args.country,
      });

      return { success: true };
    } else {
      throw new Error("No user found");
    }
  },
});

export const updateUserStatus = mutation({
  args: { clerkId: v.string() },

  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .first();

    if (user) {
      await ctx.db.patch(user._id, { lastSeen: Date.now() });
    }
  },
});

export const sendInvitation = mutation({
  args: {
    senderId: v.string(),
    recipientId: v.string(),
  },
  handler: async (ctx, args) => {
    // Sprawdzamy, czy odbiorca istnieje
    const recipient = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.recipientId))
      .first();

    if (!recipient) {
      throw new Error("Odbiorca nie istnieje");
    }

    // Sprawdzamy, czy istnieje już zaakceptowana relacja w dowolną stronę
    const existingAccepted = await ctx.db
      .query("invitations")
      .filter((q) =>
        q.or(
          q.and(
            q.eq(q.field("senderId"), args.senderId),
            q.eq(q.field("recipientId"), args.recipientId)
          ),
          q.and(
            q.eq(q.field("senderId"), args.recipientId),
            q.eq(q.field("recipientId"), args.senderId)
          )
        )
      )
      .filter((q) => q.eq(q.field("status"), "accepted"))
      .first();

    if (existingAccepted) {
      throw new Error("Jesteście już znajomymi");
    }

    // Sprawdzamy, czy istnieje już oczekujące zaproszenie w dowolną stronę
    const existingPending = await ctx.db
      .query("invitations")
      .filter((q) =>
        q.or(
          q.and(
            q.eq(q.field("senderId"), args.senderId),
            q.eq(q.field("recipientId"), args.recipientId)
          ),
          q.and(
            q.eq(q.field("senderId"), args.recipientId),
            q.eq(q.field("recipientId"), args.senderId)
          )
        )
      )
      .filter((q) => q.eq(q.field("status"), "pending"))
      .first();

    if (existingPending) {
      throw new Error(
        existingPending.senderId === args.senderId
          ? "Zaproszenie już zostało wysłane"
          : "Ten użytkownik już wysłał Ci zaproszenie – sprawdź swój profil"
      );
    }

    // Tworzymy nowe zaproszenie
    const inviteId = await ctx.db.insert("invitations", {
      senderId: args.senderId,
      recipientId: args.recipientId,
      status: "pending",
      createdAt: Date.now(),
    });

    return { inviteId };
  },
});

export const acceptInvitation = mutation({
  args: { inviteId: v.id("invitations") },
  handler: async (ctx, args) => {
    const invitation = await ctx.db.get(args.inviteId);
    if (!invitation || invitation.status !== "pending") {
      throw new Error("Zaproszenie nie istnieje lub nie jest oczekujące");
    }

    await ctx.db.patch(args.inviteId, { status: "accepted" });
  },
});
