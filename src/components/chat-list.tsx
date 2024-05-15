import { AnimatePresence, motion } from "framer-motion"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Message, UserData } from "@/app/data"
import ChatBottombar from "./chat-bottombar"
import React, { useRef } from "react"
import { cn } from "@/lib/utils"

interface ChatListProps {
  messages?: Message[]
  selectedUser: UserData
  sendMessage: (newMessage: Message) => void
  isMobile: boolean
}

export function ChatList({ messages, selectedUser, sendMessage, isMobile }: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
      <div
        ref={messagesContainerRef}
        className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 whitespace-pre-wrap p-4",
                message.name !== selectedUser.name ? "items-end" : "items-start",
              )}
            >
              <div className="flex items-center gap-3">
                {message.name === selectedUser.name && (
                  <Avatar className="flex items-center justify-center">
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                )}
                <span
                  className={cn(
                    "max-w-xs rounded-md bg-accent p-3",
                    message.name !== selectedUser.name ? "rounded-br-none" : "rounded-bl-none",
                  )}
                >
                  {message.message}
                </span>
                {message.name !== selectedUser.name && (
                  <Avatar className="flex items-center justify-center">
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  )
}
