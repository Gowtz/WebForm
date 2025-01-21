'use client'

import { usePathname } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb"
import React from "react"
import { Slash } from "lucide-react"
import Link from "next/link"
import { SidebarTrigger } from "../ui/sidebar"
import { Separator } from "../ui/separator"
function capitalizeFirstLetter(string: string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export default function Header() {
  const pathname = usePathname()
  const pathnames = pathname.split('/').filter(path => path)

  return (
    <header className="w-full h-20 border ">
      <nav className="flex px-10 items-center justify-between h-full">
        <div className="path flex items-center gap-7">
          <SidebarTrigger />
          <Separator orientation="vertical"/>
          <Breadcrumb>
            <BreadcrumbList>
              {pathnames.map((path, index) => {
                return (
                  <React.Fragment key={index}>
                    {index !== 0 &&
                      <>
                        <BreadcrumbSeparator >
                          <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                          <Link href={`/dashboard/${path}`}>{capitalizeFirstLetter(path)}</Link>
                        </BreadcrumbItem>
                      </>
                    }
                    {
                      index === 0 &&
                      <BreadcrumbItem>
                        <Link href={`/${path}`}>{capitalizeFirstLetter(path)}</Link>
                      </BreadcrumbItem>
                    }
                  </React.Fragment>
                )
              })
              }
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </nav>
    </header>
  )
}

