"use client"

// hooks
import { useMessage } from "@/app/(root)/api"
import { useForm } from "react-hook-form"

// utils
import { clientErrorHandler } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { ArrowRightCircleIcon } from "lucide-react"

// validation
import { messageSchema } from "@/lib/validation"

// types
import type { MessageValues } from "@/lib/validation"
import DynamicForm from "@/components/shared/dynamic-form"
import { messageFields } from "@/lib/misc/field-config"

const ChatForm = () => {
  const messageMutation = useMessage()
  const form = useForm<MessageValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  })

  // submit handler
  const onSubmit = async (values: MessageValues) => {
    await toast.promise(messageMutation.mutateAsync(values), {
      loading: <span className="animate-pulse">Sending...</span>,
      success: "Message sent",
      error: (error: unknown) => clientErrorHandler(error),
    })

    // reset form
    form.reset()
  }
  return (
    <div className="container size-full">
      <DynamicForm<MessageValues>
        form={form}
        onSubmit={onSubmit}
        fields={messageFields}
        submitButtonTitle={<ArrowRightCircleIcon className="text-white" />}
        formMutation={messageMutation}
        className="flex flex-row size-full gap-5 p-5"
        buttonClassName="w-[100px] hover:scale-110 transition-all"
      />
    </div>
  )
}

export default ChatForm
