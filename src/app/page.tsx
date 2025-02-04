import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import TimeLine from "./components/TimeLine";
import Avatar from "./components/Avatar";

export default function HomePage() {
  return (
    <main className="flex flex-col bg-white">
      <div className="px-4 py-8">
        <div className="flex gap-3">
          <h1 className="text-2xl">Home</h1>
          <Avatar />
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
      <TimeLine />
    </main>
  );
}
