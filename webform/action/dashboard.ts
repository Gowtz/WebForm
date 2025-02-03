'use server'

import { prisma } from "@/lib/prismaclient"
import { getServersideUser } from "./projects"

export async function getDashboardData() {
  try {
    const user = await getServersideUser()

    if (!user?.id) {
      return { error: `UNAUTHORIZED`, errordescription: "Not Authenticated or user not found" }
    }
    const projectCount = await prisma.project.count({ where: { userId: user.id } })
    const formCount = await prisma.form.count({ where: { userId: user.id } })
    const formDataCount = await prisma.formData.count({
      where: {
        api: {
          userId: user.id
        }
      }
    })
    const formdata = await prisma.formData.findMany({ where: { api: { userId: user.id } }, take: 10, include: { api: { include: { Form: true } } } })
    return { projectCount, formCount, formDataCount, formdata }
  } catch (error) {
    return { error: `There was an error`, errordescription: error }
  }
}
