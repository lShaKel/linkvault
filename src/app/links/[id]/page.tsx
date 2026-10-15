import {prismaDb} from "@/lib/prisma";
import {Suspense} from "react";
import {notFound} from "next/navigation";
import LinkFormContainer from "@/app/components/link-form/link-form-container";

type tags = {
  id: number
  title: string
  createdAt: Date
}[]

function tagToString(tags:tags){
  let stringTags = ""

  tags.forEach((tag) => {
    stringTags+=tag.title + ","
  })
  return stringTags
}

async function GetLink({params}: {params: Promise<{id: string}>}){
  const {id} = await params
  const numericId = Number(id)

  if (Number.isNaN(numericId)) {
    notFound()
  }

  const link = await prismaDb.link.findUnique({
    where: {id: numericId},
    include: {tags: true}
  })

  if(!link || link.authorId !== 1){
    notFound()
  }

  const stringTags = tagToString(link.tags)

  const initialValues = {
    title: link.title,
    url: link.url,
    description:link.description,
    tags: stringTags,
  }

  return (
    <>
    <LinkFormContainer mode="edit" linkId={link.id} initialValues={initialValues}/>
    </>
  )
}


export default async function UpdatePage({params}: {params: Promise<{id: string}>}){

  return (
    <main>
      <h1>Change link:</h1>
      <Suspense fallback={<p>Завантаження</p>}>
        <GetLink params={params}/>
      </Suspense>
    </main>
  )

}
