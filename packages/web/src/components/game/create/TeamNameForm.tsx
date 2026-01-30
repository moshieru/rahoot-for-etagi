import Button from "@rahoot/web/components/Button"
import { useState } from "react"
import toast from "react-hot-toast"

type Props = {
  onSubmit: (teamName: string) => void
}

const TeamNameForm = ({ onSubmit }: Props) => {
  const [teamName, setTeamName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!teamName.trim()) {
      toast.error("Please enter a team name")
      return
    }
    onSubmit(teamName)
  }

  return (
    <div className="z-10 flex w-full max-w-md flex-col gap-4 rounded-md bg-white p-4 shadow-sm">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-2 text-2xl font-bold">Enter Team Name</h1>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Team name"
            className="w-full rounded-md border border-gray-300 p-2"
            maxLength={50}
          />
          <Button type="submit">Start Game</Button>
        </form>
      </div>
    </div>
  )
}

export default TeamNameForm