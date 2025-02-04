"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Avatar() {
  const session = useSession();

  return (
    <>
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
    </>
  );
}
