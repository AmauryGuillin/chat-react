import { Message } from "@/types/message"
import { baseURL } from "./api-utils"

export async function storeMessageAPI(message: Message) {
  const token = localStorage.getItem("token")
  const body = {
    message: message.message,
    userId: message.id,
    isFromGeneral: message.fromGeneral,
  }
  const response = await fetch(`${baseURL}/api/chat/message/store`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.ok) {
    return response.json()
  }

  return "nope"
}

export async function getAllGeneralMessages() {
  const token = localStorage.getItem("token")
  //await new Promise((res) => setTimeout(res, 3000))
  const response = await fetch(`${baseURL}/api/chat/message/general/getAll`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.ok) {
    return response.json()
  }
}
