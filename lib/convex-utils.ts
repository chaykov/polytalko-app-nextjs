// lib/convex-utils.ts
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export async function convexQuery<QueryName extends keyof typeof api.queries>(
  queryName: QueryName,
  args?: Parameters<typeof fetchQuery>[1]
) {
  return fetchQuery(api.queries[queryName], args);
}
