import { db } from "~/server/db";

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

export async function fetchArticles(): Promise<Article[]> {
  try {
    const data = await db.article.findMany({
      include: {
        author: {
          select: {
            image: true,
            name: true,
          },
        },
      },
      take: 10,
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch article data.");
  }
}

export async function fetchInfiniteArticles(
  page = 0,
  pageSize = 10,
): Promise<Article[]> {
  try {
    const data = await db.article.findMany({
      include: {
        author: {
          select: {
            image: true,
            name: true,
          },
        },
      },
      skip: page * pageSize,
      take: pageSize,
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch article data.");
  }
}
