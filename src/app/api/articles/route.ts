import { type NextRequest, NextResponse } from "next/server";
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);
  const skip = (page - 1) * limit;

  try {
    const data = await db.article.findMany({
      skip,
      take: limit,
      include: {
        author: {
          select: {
            image: true,
            name: true,
          },
        },
      },
    });

    const totalCount = await db.article.count(); // Получаем общее количество статей

    return NextResponse.json({ data, totalCount });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch article data." },
      { status: 500 },
    );
  }
}
