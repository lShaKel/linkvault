'use server'

import {z} from "zod"
import {actionClient} from "@/lib/safe-action";
import {prismaDb} from "@/lib/prisma";
import {revalidatePath} from "next/cache";

const DeleteLinkSchema = z.object({
  id: z
    .number()
    .int()
    .positive()
})

export const DeleteLink = actionClient
  .inputSchema(DeleteLinkSchema)
  .action(async ({parsedInput}) => {
    await prismaDb.link.delete({ where: {id: parsedInput.id} })
    revalidatePath("/links")
    return {success: true}
  })