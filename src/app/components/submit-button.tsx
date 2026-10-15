'use client'

import {useFormStatus} from "react-dom";

type SubmitButtonProps = {
  mode: string,
}

export default function SubmitButton(props:SubmitButtonProps){
  const {mode} = props
  const {pending} = useFormStatus()

  const message = mode === 'create' ? 'Create Link' : 'Update Link'
  const messagePending = mode === 'create' ? 'Created new Link' : 'Updated Link'

  return (
    <button
      type="submit"
      disabled={pending}
    >
      {pending ? messagePending : message}
    </button>
  )
}