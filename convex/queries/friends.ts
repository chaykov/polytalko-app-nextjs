// import { v } from "convex/values";
// import { query } from "../_generated/server";

// export const getFriendshipStatus = query({
//   args: { userId: v.string(), friendId: v.string() },
//   handler: async (ctx, { userId, friendId }) => {
//     const friendship = await ctx.db
//       .query("friends")
//       .filter((q) =>
//         q.or(
//           q.and(
//             q.eq(q.field("userId"), userId),
//             q.eq(q.field("friendId"), friendId)
//           ),
//           q.and(
//             q.eq(q.field("userId"), friendId),
//             q.eq(q.field("friendId"), userId)
//           )
//         )
//       )
//       .first();

//     return friendship?.status || undefined;
//   },
// });
