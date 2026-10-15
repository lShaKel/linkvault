'use server'

import {z} from "zod"
import {actionClient} from "@/lib/safe-action";
import {revalidatePath} from "next/cache";
import {prismaDb} from "@/lib/prisma";

const CreateLinkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, {message: "Title must be at least 3 characters"})
    .max(50, {message: "Title must be at most 50 characters"}),

  url: z
    .url({message: "enter a valid URL"})
    .startsWith("https://", {message: "URL must start with https://"}),

  description: z
    .string()
    .trim()
    .max(300, { message: "Description must be at least 300 characters" }),

  tags: z
    .string()
    .trim()
    .max(200, { message: "Tags must be at most 200 characters" })
    .optional(),
})

export const createLink = actionClient
  .inputSchema(CreateLinkSchema)
  .action(async ({parsedInput}) => {
    const {title, url, description, tags} = parsedInput

    const tagNames = [
      ...new Set((tags ?? '')
        .split(',')
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)
      )
    ]

    const newLink = await prismaDb.link.create({
      data:{
        title,
        url,
        description,
        authorId: 1, /* Потім брати з сесії */
        tags: {
          connectOrCreate: tagNames.map((name) => ({
            where: {title:name},
            create: {title:name},
          })),
        },
      },
      include: {tags:true},
    })

    revalidatePath("/links/new")

    return {success:true, link: newLink}
  })

