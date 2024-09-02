// types
import type { FieldConfig } from "@/lib/types"
import type { MessageValues } from "@/lib/validation"

// message field
export const messageFields: FieldConfig<MessageValues>[] = [
  {
    name: "message",
    type: "text",
    label: "Chat",
    placeholder: "Enter something...",
    isAutosizeTextarea: true,
    props: { maxHeight: 200, minHeight: 50 },
  },
]
