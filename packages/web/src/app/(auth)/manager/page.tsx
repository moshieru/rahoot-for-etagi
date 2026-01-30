"use client"

import { QuizzWithId } from "@rahoot/common/types/game"
import { STATUS } from "@rahoot/common/types/game/status"
import ManagerPassword from "@rahoot/web/components/game/create/ManagerPassword"
import SelectQuizz from "@rahoot/web/components/game/create/SelectQuizz"
import TeamNameForm from "@rahoot/web/components/game/create/TeamNameForm"
import { useEvent, useSocket } from "@rahoot/web/contexts/socketProvider"
import { useManagerStore } from "@rahoot/web/stores/manager"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Manager = () => {
  const { setGameId, setStatus } = useManagerStore()
  const router = useRouter()
  const { socket } = useSocket()

  const [isAuth, setIsAuth] = useState(false)
  const [quizzList, setQuizzList] = useState<QuizzWithId[]>([])
  const [selectedQuizz, setSelectedQuizz] = useState<string | null>(null)
  const [showTeamForm, setShowTeamForm] = useState(false)

  useEvent("manager:quizzList", (quizzList) => {
    setIsAuth(true)
    setQuizzList(quizzList)
  })

  useEvent("manager:gameCreated", ({ gameId, inviteCode, instructions }) => {
    setGameId(gameId)
    setStatus(STATUS.SHOW_ROOM, { text: "Ожидание игроков", inviteCode, instructions })
    router.push(`/game/manager/${gameId}`)
  })

  const handleAuth = (password: string) => {
    socket?.emit("manager:auth", password)
  }

  const handleSelectQuizz = (quizzId: string) => {
    setSelectedQuizz(quizzId)
    setShowTeamForm(true)
  }

  const handleStartGame = (teamName: string) => {
    if (selectedQuizz) {
      socket?.emit("game:create", {
        quizzId: selectedQuizz,
        teamName
      })
    }
  }

  if (!isAuth) {
    return <ManagerPassword onSubmit={handleAuth} />
  }

  if (showTeamForm) {
    return <TeamNameForm onSubmit={handleStartGame} />
  }

  return <SelectQuizz quizzList={quizzList} onSelect={handleSelectQuizz} />
}

export default Manager
