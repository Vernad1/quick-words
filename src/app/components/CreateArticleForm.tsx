"use client";
import { useSession } from "next-auth/react";
import { type State, createArticle } from "../lib/actions";
import { useActionState } from "react";
import Image from "next/image";

export default function CreateArticleForm() {
  const session = useSession();
  const initialState: State = { message: null, errors: {} };

  const [state, formAction] = useActionState(createArticle, initialState);

  return (
    <div className="flex gap-2 p-2">
      {session.status === "loading" ? (
        <div className="flex items-center gap-3 self-start">
          <div className="shimmer h-8 w-8 animate-pulse rounded-full bg-gray-100"></div>
        </div>
      ) : (
        <Image
          className="self-start rounded-full"
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

      <form action={formAction} className="flex w-full flex-col gap-2">
        <textarea
          id="text"
          name="text"
          defaultValue={(state.payload?.get("text") ?? "") as string}
          className="focus:outline-l-gray-200 h-32 resize-none p-2 text-lg outline-2"
          placeholder="Что нового?"
        />
        <div className="flex justify-between">
          <div id="text-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.text?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
          <button className="self-end rounded-md border-[1px] border-l-gray-200 px-4 py-2">
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
}
