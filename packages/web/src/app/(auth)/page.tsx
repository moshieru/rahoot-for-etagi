"use client"
import Room from "@rahoot/web/components/game/join/Room"
import Username from "@rahoot/web/components/game/join/Username"
import { useEvent, useSocket } from "@rahoot/web/contexts/socketProvider"
import { usePlayerStore } from "@rahoot/web/stores/player"
import { setManagerId, setUserId } from "@rahoot/web/utils/userContext"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"
const Home = () => {
  const searchParams = useSearchParams()
  const userId = searchParams.get("userId")
  const managerId = searchParams.get("managerId")
  // Устанавливаем значения в глобальный контекст
  useEffect(() => {
    if (userId) {
      setUserId(userId)
      console.log("Установлен userId:", userId)
    }
    if (managerId) {
      setManagerId(managerId)
      console.log("Установлен managerId:", managerId)
    }
  }, [userId, managerId])
  const { isConnected, connect } = useSocket()
  const { player } = usePlayerStore()

  useEffect(() => {
    if (!isConnected) {
      connect()
    }
  }, [connect, isConnected])

  useEvent("game:errorMessage", (message) => {
    toast.error(message)
  })

  if (player) {
    return <Username />
  }

  return <Room />
}

export default Home
