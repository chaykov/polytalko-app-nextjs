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
import type * as mutations_friends from "../mutations/friends.js";
import type * as mutations_users from "../mutations/users.js";
import type * as queries_friends from "../queries/friends.js";
import type * as queries_users from "../queries/users.js";
import type * as types_friends from "../types/friends.js";
import type * as types_users from "../types/users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "mutations/friends": typeof mutations_friends;
  "mutations/users": typeof mutations_users;
  "queries/friends": typeof queries_friends;
  "queries/users": typeof queries_users;
  "types/friends": typeof types_friends;
  "types/users": typeof types_users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
