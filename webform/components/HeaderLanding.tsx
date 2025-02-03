'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import Image from "next/image"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Header() {
  const { data: session } = useSession()
  return (<>
    <header className="z-50 absolute w-full py-3">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex gap-5 items-center"> <Image className="border border-slate-200  border-opacity-25 rounded-lg" width={36} height={36} src={'/Icon.png'} alt="Logo" /> <div className="logo">Webform</div></div>
        <div className="navlinks">
          <ul className="flex gap-3">
            <Link href={'#'}>
              <li>Home</li>
            </Link>

            <Link href={'#about'}>
              <li>About</li>
            </Link>

            <Link href={'#pricing'}>
              <li>pricing</li>
            </Link>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <li className="cursor-not-allowed">docs</li>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Docs coming Soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </ul>
        </div>
        <div>

          {session?.user ?
            <div className="flex gap-3">
              <Link href={'/dashboard'}>
                <Button >
                  Dashboard
                </Button>
              </Link>
              <Button variant='secondary' onClick={() => { signOut() }}>
                Logout
              </Button>
            </div>
            :
            <div className="flex gap-3">
              <Button variant='secondary' onClick={() => { signIn() }}>
                Get Started
              </Button>
            </div>
          }
        </div>
      </nav>
    </header>

  </>
  )
}

