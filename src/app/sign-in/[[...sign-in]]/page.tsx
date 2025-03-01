"use client";

import { SignIn } from "@clerk/clerk-react";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden w-2/3 lg:flex items-center justify-center relative">
        <Image
          src="https://static.vecteezy.com/system/resources/previews/030/314/393/large_2x/purple-gradient-background-with-dreamy-light-blur-vertical-mobile-wallpaper-ai-generated-free-photo.jpg"
          alt="Hero"
          fill
          className="object-cover border-8 border-white rounded-2xl"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
        <SignIn />
      </div>
    </div>
  );
}