'use client'

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"

export default function ButtonsLanding() {
  return (
    <>
          <Button variant={'default'} onClick={() => signIn()}>Get Started </Button>
          <Button variant={'secondary'} onClick={() => signIn()}>Know More</Button>
    </>
  )
}

