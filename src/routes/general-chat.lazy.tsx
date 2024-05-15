import { createLazyFileRoute } from "@tanstack/react-router"
import DisplayMessages from "@/components/display-messages"
import { getAllGeneralMessages } from "@/api/message"
import { useQuery } from "@tanstack/react-query"

export const Route = createLazyFileRoute("/general-chat")({
  component: ChatGeneral,
})

function ChatGeneral() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getAllMessages"],
    queryFn: getAllGeneralMessages,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  if (isError) console.log(error.message)
  if (data) return <DisplayMessages data={data} isPending={isPending} />

  return null
}
