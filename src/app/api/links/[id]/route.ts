import {NextRequest, NextResponse} from "next/server";
import {prismaDb} from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: {params: Promise<{id: string}>}
){
  const {id} = await context.params
  const numericId = Number(id)

  if(!Number.isInteger(numericId)){
    return NextResponse.json({error: "Invalid id"}, {status: 400})
  }

  const link = await prismaDb.link.findUnique({
    where: {id: numericId},
    include: {tags: true}
  })

  if(!link){
    return NextResponse.json({error: "Not found"}, {status: 404})
  }

  return NextResponse.json(link)
}