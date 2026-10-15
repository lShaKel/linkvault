export type FormValues = {
  title: string,
  url: string,
  description: string,
  tags: string,
}

export type FormState = {
  success: boolean,
  id: number | null,
  error: string | null,
  validationErrors: {
    title?: string[],
    url?: string[],
    description?: string[],
    tags?: string[]
  }
  values: FormValues,
}