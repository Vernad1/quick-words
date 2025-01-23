"use client";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const session = useSession();

  return (
    <main className="flex min-h-full w-full max-w-[980px] flex-col border border-l-slate-200 bg-white p-3">
      <div className="px-4 py-8">
        <div className="flex gap-3">
          <h1 className="text-2xl">Home</h1>
          {session.status === "loading" ? (
            <div className="flex items-center gap-3">
              <div className="shimmer h-8 w-8 animate-pulse rounded-full bg-gray-100"></div>
            </div>
          ) : (
            <Image
              className="rounded-full"
              alt="user-avatar"
              width={32}
              height={32}
              src={
                session.data?.user.image
                  ? session.data?.user.image
                  : "/images/user-avatar.jpg"
              }
            ></Image>
          )}
        </div>
      </div>
      <div>
        <Link
          href={"/create"}
          className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PlusIcon className="w-6" />
          <p className="">Что нового?</p>
        </Link>
      </div>
    </main>
  );
}
