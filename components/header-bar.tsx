"use client";

import React from "react";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const HeaderBar = () => {
  const { user } = useUser();

  return (
    <div className="w-full h-16 flex flex-row items-center bg-yellow-500 text-zinc-950 p-6">
      <Link href="/">
        <h2 className="font-extrabold">Victory Points</h2>
      </Link>
      <div className="ml-auto">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default HeaderBar;
