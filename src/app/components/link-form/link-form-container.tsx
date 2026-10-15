'use client'

import {type FormState, type FormValues} from "@/types/link-form";
import LinkForm from "@/app/components/link-form/link-form";
import {updateLink} from "@/actions/UpdateLink";
import {createLink} from "@/actions/CreateLink";
import {useActionState} from "react";

type LinkFormContainerProps = {
  mode: 'create' | 'edit',
  linkId?: number,
  initialValues?: FormValues,
}

const emptyValues: FormValues = {
  title: "",
  url: "",
  description: "",
  tags: "",
}

export default function LinkFormContainer(props: LinkFormContainerProps){
  const {mode, linkId, initialValues} = props

  const InitialState: FormState = {
      success: false,
      id: null,
      error: null,
      validationErrors: {},
      values: initialValues ?? emptyValues,
  }

  async function submit(prevState: FormState, formData: FormData):Promise<FormState> {
    const values: FormValues = {
      title: formData.get('title') as string,
      url: formData.get('url') as string,
      description: formData.get('description') as string,
      tags: formData.get('tags') as string
    }

    const result = mode === 'edit'
      ? await updateLink({id: linkId!,...values})
      : await createLink(values)

    if(result?.validationErrors){
      return {
        success: false,
        id: null,
        error: null,
        validationErrors: {
          title: result.validationErrors.title?._errors,
          url: result.validationErrors.url?._errors,
          description: result.validationErrors.description?._errors,
          tags: result.validationErrors.tags?._errors,
        },
        values,
      }
    }

    if(result?.serverError){
      return{
        success: false,
        id: null,
        error: result.serverError,
        validationErrors:{},
        values: values,
      }
    }

    if(result?.data?.success){
      if(mode === 'create') {
        return{
          success: true,
          id: result.data.link.id,
          error: null,
          validationErrors:{},
          values: emptyValues,
        }
      }
      if(mode === 'edit'){
        return{
          success:true,
          id: result.data.link.id,
          error: null,
          validationErrors:{},
          values: values,
        }
      }
    }
    return { ...prevState, values };
  }

  const [state, formAction, isPending] = useActionState(submit, InitialState)

  return(
    <>
      <LinkForm state={state} formAction = {formAction} isPending={isPending} mode={mode}/>

      {state.error && (
        <div>
          {state.error}
        </div>
      )}

      {state.success && (
        <div>
          Створено. ID: {state.id}
        </div>
      )}
    </>
  )
}