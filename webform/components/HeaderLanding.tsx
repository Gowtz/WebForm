'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import Image from "next/image"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ModeToggle } from "./theme"
import { Menu } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const { data: session } = useSession()
  const [open,setOpen] = useState(false)
  return (<>
    <header className="z-50 absolute w-full py-3">
      <nav className="container mx-auto flex justify-between items-center px-10">
        <div className="flex gap-5 items-center"> <Image className="border border-slate-200  border-opacity-25 rounded-lg" width={36} height={36} src={'/Icon.png'} alt="Logo" /> <div className="logo">Webform</div></div>
        <div className="navlinks hidden md:block">
          <ul className="flex items-center gap-3">
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
            <ModeToggle />
          </ul>
        </div>
        <div className="hidden md:block">

          {session?.user ?
            <div className="flex gap-3 ">
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
              <Button onClick={() => { signIn() }}>
                Get Started
              </Button>
            </div>
          }
        </div>
        <Menu className="cursor-pointer border  rounded p-1  border-black dark:border-white" size={32} onClick={()=>setOpen(prev => !prev)}/>
      </nav>
      <div className={`${open ? 'block' : 'hidden'} md:hidden `}>
        <div className="navlinks absolute top-20 left-0 w-full p-10  bg-black bg-opacity-5 dark:bg-opacity-40 backdrop-blur-2xl">
          <div>

            <ul className="flex flex-col items-start gap-3">
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
              <div className="py-5">
                <ModeToggle />
              </div>
            </ul>
          </div>
          <div >

            {session?.user ?
              <div className="flex gap-3 ">
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
                <Button onClick={() => { signIn() }}>
                  Get Started
                </Button>
              </div>
            }
          </div>
        </div>
      </div>
    </header>

  </>
  )
}

