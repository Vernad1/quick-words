"use server";

import { z } from "zod";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export type State = {
  errors?: {
    text?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  text: z
    .string({
      invalid_type_error: "Неверный тип!",
      required_error: "Текст не может быть пустым!",
    })
    .min(5, "Нельзя написать меньше 5 символов"),
  createdAt: z.string(),
  auhorId: z.string(),
});

const CreateInvoice = FormSchema.omit({
  id: true,
  createdAt: true,
  auhorId: true,
});

export async function createArticle(
  state: State | undefined,
  formData: FormData,
) {
  const user = await auth();
  if (!user?.user.id) throw new Error("Unauthorized");

  const validatedFields = CreateInvoice.safeParse({
    text: formData.get("text"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Article.",
    };
  }

  // Prepare data for insertion into the database
  const { text } = validatedFields.data;

  // Insert data into the database
  try {
    await db.article.create({
      data: {
        text,
        authorId: user.user.id,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "Database Error: Failed to Create Invoice.",
      };
    }
  }
}
