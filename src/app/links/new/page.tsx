'use client'

import LinkFormContainer from "@/app/components/link-form/link-form-container";

export default function NewDropPage(){

  return(
    <main>
      <h2>Create your link</h2>
    <LinkFormContainer mode="create"/>
    </main>
  )
}