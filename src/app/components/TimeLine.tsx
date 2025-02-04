"use client";

import { pages } from "next/dist/build/templates/app-page";
import Image from "next/image";
import { useInfiniteQuery, useQuery } from "react-query";

type Article = {
  id: string;
  text: string | null;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    image: string | null;
    name: string | null;
  };
};

const fetchArticles = async ({
  pageParam = 1,
}): Promise<{ data: Article[]; totalCount: number }> => {
  const response = await fetch(`/api/articles?page=${pageParam}&limit=10`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = (await response.json()) as {
    data: Article[];
    totalCount: number;
  };

  return data;
};

export default function TimeLine() {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery("articles", fetchArticles, {
      getNextPageParam: (lastPage) => {
        const totalPages = Math.ceil(lastPage.totalCount / 10);

        return lastPage.data.length < 10 ? undefined : totalPages;
      },
    });

  console.log(data);
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <ul>
        {data?.pages.map((page) =>
          page.data.map((article) => (
            <li
              key={article.id}
              className="flex gap-2 border-b border-gray-200 px-4 py-3"
            >
              {article.author.image && (
                <Image
                  alt={`Аватар:${article.author.name ? article.author.name : "Анонимуса"}`}
                  src={article.author.image}
                  className="self-start rounded-full"
                  width={32}
                  height={32}
                />
              )}

              <div>
                <div className="flex gap-3">
                  <span className="font-semibold">{article.author.name}</span>
                  <span className="self-end text-gray-600">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div>{article.text}</div>
              </div>
            </li>
          )),
        )}
      </ul>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>Load More</button>
      )}
    </>
  );
}
