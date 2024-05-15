export interface Message {
  id: number
  sender: string | null
  message: string | undefined
  date: string
  conversationId: number | null
  chatBubbleColor: string
  fromGeneral: boolean
}
