import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export function useProfile(userId: string | undefined) {
  return useQuery(api.queries.getUserProfile, { userId: userId || "" });
}
