import {prismaDb} from "@/lib/prisma";
import DeleteButton from "@/app/components/delete-button";
import {Suspense} from "react";
import Link from "next/link";

async function LinksList(){
  const links = await prismaDb.link.findMany({
    include: {tags:true},
    orderBy: {createdAt: 'desc'},
  })

  return(
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
            >
              {link.title}
            </a>
            <div>{link.tags?.map((tag) => (tag.title)).join(', ')}</div>
            <DeleteButton id={link.id} />
            {link.authorId === 1 ? <Link href={`/links/${link.id}`}>Change Link</Link> : null}
          </li>
        ))}
      </ul>
  )
}

export default function HomePage(){
  return (
    <main>
      <h1>Links:</h1>
      <Suspense fallback={<p>Завантаження</p>}>
        <LinksList/>
      </Suspense>
    </main>
  )
}