import { z } from "zod";

// ------------------------------
export const getPendingRequestsSchema = z.object({
  clerkId: z.string().min(1, "ClerkId must be at least 1 character long."),
});

export const pendingRequestSchema = z.object({
  _id: z.string(),
  clerkIdA: z.string(),
  clerkIdB: z.string(),
});

// ------------------------------

export const getPendingRequestsCountSchema = z.object({
  clerkId: z.string().min(1, "ClerkId must be at least 1 character long."),
});

export const getFriendsAcceptedListSchema = z.object({
  clerkId: z.string().min(1, "ClerkId must be at least 1 character long."),
});

export const getFriendsListSchema = z.object({
  clerkId: z.string().min(1, "ClerkId must be at least 1 character long."),
});
