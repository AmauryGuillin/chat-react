import { baseURL } from "./api-utils"

export async function authenticationAPI(formData: FormData) {
  const body = {
    email: formData.get("email"),
    password: formData.get("password"),
  }
  const response = await fetch(`${baseURL}/api/chat/auth/login`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (response.ok) {
    const data = await response.json()
    return data
  }
  return "nope"
}

export async function registerAPI(formData: FormData) {
  const body = {
    fullName: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  }

  await fetch(`${baseURL}/api/chat/auth/register`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
}
