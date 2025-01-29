"use server"
const BACKEND_URL = process.env.BACKEND_URL
import { prisma } from "@/lib/prismaclient"
import { getServersideUser } from "./projects"
import { generateRandomString } from "@/lib/utils"
import { revalidatePath } from "next/cache"

// TODO:Add pagination
export const getAllForms = async () => {
  const user = await getServersideUser()
  if (user) {
    const forms = await prisma.form.findMany({
      where: {
        userId: user?.id
      },
      include: {
        project: true,
        Api:true
      }, orderBy: {
        createdAt: 'asc'
      }
    })
    console.log(forms)
    return forms
  }
}

export const toggleActiveForm = async ({ isActive, formId }: { isActive: boolean, formId: string }) => {
  const user = await getServersideUser()
  if (user) {
    await prisma.form.update({
      where: {
        id: formId
      },
      data: {
        isActive
      },

    })
    revalidatePath('/dashboard/forms')
  }
}

export const deleteForm = async ({ formId }: { formId: string }) => {
  const user = await getServersideUser();
  if (user) {
    const form = await prisma.form.delete({
      where: {
        id: formId
      },
    })
    revalidatePath('/dashboard/forms')
    return form
  }
}

export const createForm = async ({ projectId, name, formSchema }: { projectId: string, name: string, formSchema: string }) => {
  const user = await getServersideUser()
  if (user) {
    const secret = generateRandomString()
    const API = await prisma.api.create({
      data: {
        projectId,
        userId: user.id,
        secret
      }
    })
   console.log(projectId, name, formSchema,API)
    const project = await prisma.form.create({
      data: {
        userId: user.id,
        projectId,
        formSchema,
        name,
        apiId:API.id
      }
    })

    revalidatePath('/dashboard/forms')
    return project
  }
}


export const editForm = async ({ projectId, name, formSchema, formId }: { formId: string, projectId: string, name: string, formSchema: string }) => {
  const user = await getServersideUser()
  if (user) {
    const project = await prisma.form.update({
      where: {
        id: formId
      },
      data: {
        userId: user.id,
        projectId,
        formSchema,
        name,
      }
    })

    revalidatePath('/dashboard/forms')
    return project
  }
}
