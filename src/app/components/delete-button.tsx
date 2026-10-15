'use client'

import {DeleteLink} from "@/actions/DeleteLink";
import {useState} from "react";

type DeleteButtonProps = {
  id: number,
}

export default function DeleteButton(props: DeleteButtonProps){
  const {id} = props
  const [isPending, setIsPending] = useState<boolean>(false)

  const handleClick = async () => {
    setIsPending(true)
    try{
      const result = await DeleteLink({id})

      if(result?.serverError){
        throw new Error(result.serverError)
      }
    } catch (error) {
      alert('Something went wrong')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <button
      type='button'
      onClick={() => handleClick()}
      disabled={isPending}
    >
      {isPending ? 'Deleting' : 'Delete link'}
    </button>
  )
}