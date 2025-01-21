'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"

export default function Getname() {
  const {data:session}= useSession()
  return (<>

    {session?.user ? <>
      <h1 className="text-3xl">{session.user.name}</h1>
      <Button onClick={() => { signOut() }}>
        Signout
      </Button>
    </> :
      <Button onClick={() => { signIn() }}>
        Signout
      </Button>
    }

  </>
  )
}

