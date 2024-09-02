"use client"

// components
import Image from "next/image"

// utils
import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"

interface ChatMessagesProps {
  message: string
  isUser: boolean
  className?: string
}

const ChatMessages = ({ message, isUser, className }: ChatMessagesProps) => {
  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }
  return (
    <motion.div
      className={twMerge(
        "flex items-start gap-2 p-3 rounded-lg max-w-lg",
        isUser
          ? "bg-gradient-to-br from-green-800/[0.8] to-blue-800/[0.7] border border-green-400 text-white self-end my-2"
          : "bg-gradient-to-br from-green-950/[0.8] to-blue-950/[0.7] border border-green-900 text-white self-start my-2",
        className,
      )}
      initial="hidden"
      animate="visible"
      variants={messageVariants}
    >
      {!isUser && (
        <Image
          src="/images/vustronchan.jpg"
          alt="Vustron-chan avatar"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
      )}
      <p>{message}</p>
    </motion.div>
  )
}

export default ChatMessages
