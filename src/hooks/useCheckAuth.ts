import { useRouter } from "@tanstack/react-router"
import { useEffect, useState } from "react"

export default function useCheckAuth() {
  const router = useRouter()
  const token = localStorage.getItem("token")
  const [isConnected, setConnected] = useState(false)

  useEffect(() => {
    setConnected(!!token)
  }, [token])

  function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("userID")
    localStorage.removeItem("AuthUsername")
    setConnected(false)
    router.history.push("/")
  }

  return {
    isConnected,
    handleLogout,
  }
}
