'use server'

import { prisma } from "@/lib/prismaclient"
import { getServersideUser } from "./projects"

export const getFormsDataById= async ({id}:{id:string}) => {
  const user = await getServersideUser()
  if (user) {
    const forms = await prisma.form.findUnique({
      where:{
        id
      },
      include:{
       api:{
          include:{
            FormData:true
          }
        }
      }
    })
    return forms
  }
}
