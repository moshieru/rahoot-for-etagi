"use client"

import { useSearchParams } from "next/navigation"
import Room from "@rahoot/web/components/game/join/Room"
import Username from "@rahoot/web/components/game/join/Username"
import { useEvent, useSocket } from "@rahoot/web/contexts/socketProvider"
import { usePlayerStore } from "@rahoot/web/stores/player"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const Home = () => {
  const searchParams = useSearchParams()
  const userId = searchParams.get("userId")
  // Можно сохранить userId в состояние, контекст или передать дальше
  console.log("Получен userId:", userId)
  const { isConnected, connect, socket } = useSocket()
  const { player } = usePlayerStore()
  const [authRequested, setAuthRequested] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [blockedMessage, setBlockedMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!isConnected) {
      connect()
    }
  }, [connect, isConnected])

  useEvent("game:errorMessage", (message) => {
    toast.error(message)
  })

  useEvent("auth:allowed", () => {
    setAuthChecked(true)
  })

  useEvent("auth:blocked", ({ message }) => {
    setBlockedMessage(message)
    setAuthChecked(true)
  })

  useEffect(() => {
    if (isConnected && socket && !authRequested) {
      socket.emit("auth:check", { role: "player" })
      setAuthRequested(true)
    }
  }, [authRequested, isConnected, socket])

  if (!authChecked) {
    return (
      <div className="text-center text-2xl font-bold text-white drop-shadow-lg">
        Проверка доступа...
      </div>
    )
  }

  if (blockedMessage) {
    return (
      <div className="text-center text-2xl font-bold text-white drop-shadow-lg">
        {blockedMessage}
      </div>
    )
  }

  if (player) {
    return <Username />
  }

  return <Room />
}

export default Home
