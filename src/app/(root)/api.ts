"use client"

// hooks
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

// utils
import { httpRequest } from "@/lib/config/http"
import { clientErrorHandler, sanitizer } from "@/lib/utils"
import DOMPurify from "dompurify"

// configs
import { env } from "@/lib/config/env.mjs"

// validation
import { messageSchema } from "@/lib/validation"

// types
import type { MessageValues } from "@/lib/validation"

const purify = DOMPurify

export const useMessage = () => {
  const router = useRouter()

  return useMutation({
    mutationKey: ["message"],
    mutationFn: async (values: MessageValues) => await message(values),
    onSettled: () => {
      router.refresh()
    },
    onError: (error) => clientErrorHandler(error),
  })
}

async function message(values: MessageValues) {
  const unsanitizedData = values
  const URL = `${env.NEXT_PUBLIC_APP_URL}/api/v2/chat`

  const sanitizedData = sanitizer<MessageValues>(
    unsanitizedData,
    messageSchema,
    purify,
  )

  const data = await httpRequest(URL, "POST", {
    body: sanitizedData,
  })
  return data
}
