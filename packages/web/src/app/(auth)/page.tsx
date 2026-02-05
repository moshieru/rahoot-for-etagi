"use client"

import { useSearchParams } from "next/navigation"
import Room from "@rahoot/web/components/game/join/Room"
import Username from "@rahoot/web/components/game/join/Username"
import { useEvent, useSocket } from "@rahoot/web/contexts/socketProvider"
import { usePlayerStore } from "@rahoot/web/stores/player"
import { useEffect } from "react"
import toast from "react-hot-toast"

const Home = () => {
  const searchParams = useSearchParams()
  const userId = searchParams.get("userId")
  // Можно сохранить userId в состояние, контекст или передать дальше
  console.log("Получен userId:", userId)
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
