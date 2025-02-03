'use server'

import { prisma } from "@/lib/prismaclient"
import { getServersideUser } from "./projects"

// TODO: add pagination
export const getFormsDataById = async ({ id }: { id: string }) => {
  const user = await getServersideUser()
  if (user) {
    const forms = await prisma.form.findFirst({
      where: {
        id
      },
      include: {
        api: {
          include: {
            FormData: true
          }
        }
      }
    })
    return forms
  }
}
