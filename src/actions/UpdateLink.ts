'use server'

import {z} from "zod"
import {actionClient} from "@/lib/safe-action";
import {revalidatePath} from "next/cache";
import {prismaDb} from "@/lib/prisma";

const UpdateLinkSchema = z.object({
  id: z
    .number()
    .int()
    .positive(),

  title: z
    .string()
    .trim()
    .min(3, {message: "Title must be at least 3 characters"})
    .max(50, {message: "Title must be at most 50 characters"})
    .optional(),

  url: z
    .url({message: "enter a valid URL"})
    .startsWith("https://", {message: "URL must start with https://"})
    .optional(),

  description: z
    .string()
    .trim()
    .max(300, { message: "Description must be at least 300 characters" })
    .optional(),

  tags: z
    .string()
    .trim()
    .max(200, { message: "Tags must be at most 200 characters" })
    .optional(),

})

export const updateLink = actionClient
  .inputSchema(UpdateLinkSchema)
  .action(async ({parsedInput}) => {
    const {id, title, url, description, tags} = parsedInput

    const tagNames = [
      ...new Set((tags ?? '')
        .split(',')
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)
      )
    ]

    const link = await prismaDb.link.update({
      where: {id},
      data:{
        title,
        url,
        description,
        tags: {
          connectOrCreate: tagNames.map((name) => ({
            where: {title:name},
            create: {title:name},
          })),
        },
      },
      include: {tags:true},
    })

    revalidatePath("/links")

    return {success:true, link}
  })

