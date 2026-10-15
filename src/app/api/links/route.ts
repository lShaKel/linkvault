import {prismaDb} from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function GET(){
  const links = await prismaDb.link.findMany({
    include: { tags:true },
    orderBy: { createdAt:"desc" },
  })
  return NextResponse.json(links)
}