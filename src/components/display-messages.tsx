import React, { FormEvent, useEffect, useState } from "react"
import { Loader2, SendHorizontal } from "lucide-react"
import { socket } from "@/websocket/messages-socket"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { useMutation } from "@tanstack/react-query"
import ChatBubbleRight from "./chat-bubble-right"
import { storeMessageAPI } from "@/api/message"
import ChatBubbleLeft from "./chat-buble-left"
import { Message } from "@/types/message"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

type Props = {
  data: Message[]
  isPending: boolean
}

export default function DisplayMessages({ data, isPending }: Props) {
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>(data)

  useEffect(() => {
    socket.connect()
  }, [])

  /**
   * This useEffect is used to retrive the message from the websocket server.
   * Then it store the message in the array messages to display the actual message.
   */
  useEffect(() => {
    socket.on("messageToFront", (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  const mutation = useMutation({
    mutationFn: (message: Message) => storeMessageAPI(message),
  })
  const username = localStorage.getItem("AuthUsername")
  const userID = Number(localStorage.getItem("userID"))
  const isFromGeneral = true

  function sendToSocket(msg: Message) {
    socket.emit("sendMessage", msg)
  }

  function sendMessage(event?: FormEvent) {
    event?.preventDefault()
    const form = event?.target as HTMLFormElement
    const formData = new FormData(form)
    const newMessage: Message = {
      id: userID,
      sender: username,
      message: formData.get("message")?.toString().trim(),
      date: new Date().toISOString(),
      conversationId: null,
      chatBubbleColor: "userChoice",
      fromGeneral: isFromGeneral,
    }
    if (newMessage.message?.trim() === "") return
    sendToSocket(newMessage)
    mutation.mutate(newMessage)
    setMessage("")
  }
  return (
    <>
      <div className="mt-10 flex h-screen justify-center">
        <div className="flex max-h-[80%] w-[70%] flex-col rounded-lg">
          <div className=" flex h-[7.5%] w-full items-center justify-center gap-2 rounded-lg bg-gray-200 dark:bg-gray-900">
            <div>
              <Avatar>
                <AvatarFallback>{username?.charAt(0).toLocaleUpperCase() || "P"}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              Connected as: <span className="font-bold">{username || "Placeholder"}</span>
            </div>
          </div>
          <div className="min-h-[88.5%] w-full overflow-x-auto">
            {isPending && (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="animate-spin" />
              </div>
            )}
            {messages?.length ? (
              <>
                {messages.map((message) => (
                  <React.Fragment key={crypto.randomUUID()}>
                    {message.sender !== username ? (
                      <ChatBubbleLeft message={message} key={crypto.randomUUID()} />
                    ) : (
                      <ChatBubbleRight message={message} key={crypto.randomUUID()} />
                    )}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="font-bold">Be the first to send a message!</div>
              </div>
            )}
          </div>
          <form
            className="mt-2 flex min-h-[5%] w-full items-center space-x-2"
            onSubmit={sendMessage}
          >
            <Input
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Send a message to the general chanel"
              autoComplete="off"
            />
            <Button className="rounded-2xl">
              <SendHorizontal />
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
