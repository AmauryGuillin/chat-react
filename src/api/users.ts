import { baseURL } from "./api-utils"

export async function getUsersPM() {
  const token = localStorage.getItem("token")
  const userID = localStorage.getItem("userID")

  const response = await fetch(`${baseURL}api/chat/discussion/user/${userID}/getAll`, {
    method: "GET",
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
