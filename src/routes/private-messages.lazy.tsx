import { createLazyFileRoute } from "@tanstack/react-router"
import { ChatLayout } from "@/components/chat-layout"

export const Route = createLazyFileRoute("/private-messages")({
  component: PrivateMessages,
})

export function PrivateMessages() {
  return (
    <main className="flex h-[calc(100dvh-4.5rem)] flex-col items-center justify-center gap-4 p-4 py-32 md:px-24">
      <div className="z-10 h-full w-full max-w-5xl rounded-lg border text-sm lg:flex">
        <ChatLayout navCollapsedSize={8} />
      </div>
    </main>
  )
}
