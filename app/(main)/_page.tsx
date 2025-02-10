"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import LogoutButton from "../dashboard/_components/LogoutButton";

export default function Home() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="relative isolate overflow-hidden bg-white">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full stroke-gray-300 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={180}
            height={180}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 2xl:py-40 lg:pt-20">
        {/* <div className="mx-auto w-full px-6 lg:px-8 2xl:px-10 sm:justify-center flex flex-col items-center p-12 justify-center lg:flex-row lg:p-12"> */}
        <div className="mx-auto max-w-3xl lg:mx-0 lg:shrink-0">
          {/* <img
            alt="Your company"
            src="http://tailwindui.com/plus/img/logos/mark.svg?color=red&shade=600"
            className="h-11"
          /> */}
          <h1 className="text-5xl font-semibold text-gray-900/80">PolyTalko</h1>
          <div className="mt-24 sm:mt-16 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm/6 text-indigo-600 ring-1 ring-indigo-600/10 ring-inset">
                What&apos;s new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-600">
                <span>Launched a version alpha</span>
                <ChevronRightIcon
                  aria-hidden="true"
                  className="size-5 text-gray-400"
                />
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
            Meet up friends from all the world
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            PolyTalko is a platform that connects people from all over the
            world, enabling language exchange and cultural discovery in a
            friendly and welcoming environment. Whether you&apos;re looking to
            improve your language skills, make new friends, or simply explore
            different cultures – PolyTalko is the perfect place for you!
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            {!isSignedIn && !user && (
              <SignInButton
                mode="modal"
                fallbackRedirectUrl={"/dashboard"}
                forceRedirectUrl={"dashboard"}
              >
                <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-2xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Login
                </button>
              </SignInButton>
            )}

            {isSignedIn && user && (
              <>
                <Link href="/dashboard">
                  <button className="text-sm/6 font-semibold rounded-md bg-sky-500 px-3.5 py-2.5 shadow-2xs hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 text-white">
                    Go to the dashboard page
                  </button>
                </Link>
                <LogoutButton userId={user.id} />
              </>
            )}
          </div>
        </div>
        <div className="mx-auto mt-16 flex justify-center max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-gray-900/10 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/images/bg-home.jpeg"
                alt="background"
                width={640}
                height={640}
                className="object-cover rounded-md ring-1 shadow-2xl ring-gray-900/10"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
