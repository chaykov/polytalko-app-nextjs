/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as api_ from "../api.js";
import type * as getUsers from "../getUsers.js";
import type * as logout from "../logout.js";
import type * as mutations_acceptFriend from "../mutations/acceptFriend.js";
import type * as mutations from "../mutations.js";
import type * as queries_getAcceptedFriends from "../queries/getAcceptedFriends.js";
import type * as queries_getIncomingFriendRequests from "../queries/getIncomingFriendRequests.js";
import type * as query from "../query.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  api: typeof api_;
  getUsers: typeof getUsers;
  logout: typeof logout;
  "mutations/acceptFriend": typeof mutations_acceptFriend;
  mutations: typeof mutations;
  "queries/getAcceptedFriends": typeof queries_getAcceptedFriends;
  "queries/getIncomingFriendRequests": typeof queries_getIncomingFriendRequests;
  query: typeof query;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
