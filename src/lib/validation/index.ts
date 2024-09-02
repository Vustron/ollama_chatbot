// utils
import { z } from "zod"

export const messageSchema = z.object({
  message: z
    .string()
    .min(1, { message: "Message is required" })
    .max(500, { message: "Message cannot exceed 500 characters" })
    .trim(),
})

export type MessageValues = z.infer<typeof messageSchema>
