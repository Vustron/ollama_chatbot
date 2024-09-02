"use client"

// components
import Hero from "@/app/(root)/_components/hero"
import ChatForm from "@/app/(root)/_components/form"
import ChatMessages from "@/app/(root)/_components/messages"
import { Button } from "@/components/ui/button"

// hooks
import { useState, useRef } from "react"

// utils
import { AnimatePresence, motion } from "framer-motion"

// types
import type { ElementRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

const Client = () => {
  const [showChatInput, setShowChatInput] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isUser: false },
  ])
  const topRef = useRef<ElementRef<"div">>(null)
  const bottomRef = useRef<ElementRef<"div">>(null)

  const handleChatNowClick = () => {
    setShowChatInput(true)
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  }

  const inputVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  return (
    <section className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
      <div className="w-full h-full px-4 relative">
        <div className="relative flex flex-col items-center justify-center w-full h-full z-[1] animate-moveUp">
          {!showChatInput && <Hero />}

          {showChatInput && (
            <div className="h-[450px] overflow-hidden">
              <ScrollArea className="h-[450px] w-full max-w-2xl p-5">
                <div ref={topRef}>
                  <div className="flex flex-col mt-auto">
                    {messages.map((msg, index) => (
                      <ChatMessages
                        key={index}
                        message={msg.text}
                        isUser={msg.isUser}
                      />
                    ))}
                  </div>
                </div>
              </ScrollArea>
              <div ref={bottomRef} />
            </div>
          )}

          <div className="mt-5 w-full flex flex-col sm:flex-row justify-center sm:gap-10 gap-4 text-white">
            <AnimatePresence mode="wait">
              {!showChatInput ? (
                <motion.div
                  key="button"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                >
                  <Button
                    onClick={handleChatNowClick}
                    className="h-10 sm:h-8 w-full sm:w-36 bg-gradient-to-br from-green-950 to-blue-950 border border-green-900 rounded-lg flex items-center justify-center gap-1.5"
                    aria-label="Start chatting with Vustron-chan"
                  >
                    <span>Chat now</span>
                    <motion.span
                      className="inline-block"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      &rarr;
                    </motion.span>
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="input"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={inputVariants}
                  className="w-full max-w-md"
                >
                  <ChatForm />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Client
