import { Avatar, AvatarFallback } from "./ui/avatar"
import { Message } from "@/types/message"

type Props = {
  message: Message
}

export default function ChatBubbleRight({ message }: Props) {
  return (
    <>
      <div className="flex w-full justify-end gap-2 p-2">
        <div className="flex flex-col items-end">
          <div className="flex items-center justify-center gap-2">
            <div className="font-bold">{message.sender}</div>
            <div className="text-xs opacity-50">{message.date.substring(11, 16)}</div>
          </div>
          <div className="w-fit rounded-xl rounded-br-none border-2 bg-gray-300 p-2 dark:bg-gray-800">
            <div>{message.message}</div>
          </div>
        </div>
        <div className="pt-2">
          <Avatar>
            <AvatarFallback>{message.sender?.charAt(0).toLocaleUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  )
}
