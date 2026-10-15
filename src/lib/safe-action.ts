import {createSafeActionClient} from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    console.log("Server error:", error.message)

    return error.message || 'Internal server error'
  },
})