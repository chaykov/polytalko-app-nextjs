"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import BackgroundPattern from "./components/BackgroundPattern";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  return (
    <div className="relative isolate overflow-hidden bg-linear-to-br from-indigo-700 to-indigo-900 h-screen">
      <BackgroundPattern />
      <div className="flex items-center min-h-full justify-center flex-col">
        <div className="mx-auto max-w-2xl text-center p-6 sm:p-12">
          <h1 className="text-7xl md:text-[92px] font-bold text-white mb-12">
            PolyTalko
          </h1>
          <h2 className="text-balance font-semibold tracking-tight text-white text-4xl md:text-5xl">
            Get some new friends from all over the world.
          </h2>
          <p className="mx-auto mt-6 max-w-sm md:max-w-xl text-pretty text-md/8 md:text-lg/8 text-indigo-200">
            🌍 PolyTalko – where the world connects! Want to sharpen your
            language skills, meet people from different cultures, and make new
            friends? 🚀 PolyTalko is a vibrant space full of positive energy
            where you can learn, share experiences, and have a great time. Join
            us and explore the world together! 🌏✨
          </p>
          <div className="mt-6 md:mt-10 flex items-center justify-center gap-x-6">
            {!isSignedIn ? (
              <SignInButton
                mode="modal"
                fallbackRedirectUrl={"/dashboard"}
                forceRedirectUrl={"/dashboard"}
              >
                <button className="bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-xs hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  Get started
                </button>
              </SignInButton>
            ) : (
              <button
                onClick={() => router.push("/dashboard")}
                className="bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-xs hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Go to Dashboard
              </button>
            )}
            <button className="text-sm/6 font-semibold text-white">
              Learn more <span aria-hidden="true">&#8594;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
