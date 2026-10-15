'use client'

import SubmitButton from "@/app/components/submit-button";
import {useState} from "react";
import {FormState} from "@/types/link-form";

type LinkFormProps = {
  state: FormState,
  formAction: (formData: FormData) => void,
  isPending: boolean,
  mode: 'edit' | 'create',
}

export default function LinkForm(props:LinkFormProps){
  const {state, formAction, isPending, mode} = props

  const [titleInput,setTitleInput] = useState<string>(state.values.title || '')
  const [urlInput,setUrlInput] = useState<string>(state.values.url || '')
  const [descriptionInput,setDescriptionInput] = useState<string>(state.values.description || '')
  const [tagInput,setTagInput] = useState<string>(state.values.tags || '')

  return(
    <form action={formAction}>
      <div>
        <label htmlFor="title">Назва лінк</label>
        <input
          id="title"
          name="title"
          type="text"
          disabled={isPending}
          value={titleInput}
          onChange={(event) => setTitleInput(event.target.value)}
        />
        {state.validationErrors.title && (
          <span>{
            state.validationErrors.title.join(', ')}
            </span>
        )}
      </div>

      <div>
        <label htmlFor="url">Url</label>
        <input
          id="url"
          name="url"
          type="text"
          disabled={isPending}
          value={urlInput}
          onChange={(event) => setUrlInput(event.target.value)}
        />
        {state.validationErrors.url && (
          <span>
              {state.validationErrors.url.join(', ')}
            </span>
        )}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          type="text"
          disabled={isPending}
          value={descriptionInput}
          onChange={(event) => setDescriptionInput(event.target.value)}
        />
        {state.validationErrors.description && (
          <span>
              {state.validationErrors.description.join(', ')}
            </span>
        )}
      </div>
      <div>
        <label htmlFor="tags">Tag</label>
        <input
          id="tags"
          name="tags"
          type="text"
          disabled={isPending}
          value={tagInput}
          onChange={(event) => setTagInput(event.target.value)}
        />
        {state.validationErrors.tags && (
          <span>
              {state.validationErrors.tags.join(', ')}
            </span>
        )}
      </div>
      <SubmitButton mode={mode}/>
    </form>
  )
}