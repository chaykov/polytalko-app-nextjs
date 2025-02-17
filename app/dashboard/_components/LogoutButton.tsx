// "use client";

// import { api } from "@/convex/_generated/api";
// import { SignOutButton, useAuth } from "@clerk/nextjs";
// import { useMutation } from "convex/react";
// import { useRouter } from "next/navigation";

// interface LogoutProps {
//   userId: string;
// }

// export default function LogoutButton({ userId }: LogoutProps) {
//   const { sessionId } = useAuth();
//   const setOffline = useMutation(api.logout.setOffline);

//   const router = useRouter();

//   const handleLogout = () => {
//     if (!userId || !sessionId) return;
//     setOffline({ userId, sessionId: sessionId || "" });

//     router.push("/");
//   };

//   return (
//     <SignOutButton signOutOptions={{ redirectUrl: "/" }}>
//       <button
//         onClick={handleLogout}
//         className="bg-red-500 text-white px-4 py-2"
//       >
//         Log out
//       </button>
//     </SignOutButton>
//   );
// }
