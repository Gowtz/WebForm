"use server"
import { prisma } from "@/lib/prismaclient"
import { getServersideUser } from "./projects"
import { generateRandomString } from "@/lib/utils"
import { revalidatePath } from "next/cache"

// TODO:Add pagination
export const getAllForms = async () => {
  const user = await getServersideUser()
  if (!user?.id) {
    return { error: `UNAUTHORIZED`, errordescription: "Not authenticated" }
  }
  try {
    const forms = await prisma.form.findMany({
      where: {
        userId: user.id
      },
      include: {
        project: true,
        api: true
      }, orderBy: {
        createdAt: 'asc'
      }
    })
    return { data: forms }
  } catch (error) {
    return { error: `There was an error`, errordescription: error }
  }

}


export const toggleActiveForm = async ({ isActive, formId }: { isActive: boolean, formId: string }) => {
  const user = await getServersideUser()
  if (user) {
    try {

      await prisma.form.update({
        where: {
          id: formId
        },
        data: {
          isActive
        },

      })
      revalidatePath('/dashboard/forms')
    } catch (error) {
      console.log("There was a error in toogleActiveForm", error)
    }
  }
}

export const deleteForm = async ({ formId }: { formId: string }) => {
  const user = await getServersideUser();
  if (user) {
    try {

      const form = await prisma.form.delete({
        where: {
          id: formId
        },
      })
      revalidatePath('/dashboard/forms')
      return { data: form }
    } catch (error) {
      return { error: "There was as error while performing delete form", errordescription: error }
    }
  }
}


export const createForm = async ({ projectId, name, formSchema }: { projectId: string, name: string, formSchema: string }) => {
  const user = await getServersideUser()
  if (user) {
    const formCount = await prisma.form.count({
      where: {
        userId: user.id
      }
    })
    if (formCount >= 10) {

      return { error: "FORM_LIMIT_REACHED", errordescription: "You have reached the form limit for your plan." }
    }
    const secret = generateRandomString()
    const API = await prisma.api.create({
      data: {
        projectId,
        userId: user.id,
        secret
      }
    })
    const project = await prisma.form.create({
      data: {
        userId: user.id,
        projectId,
        formSchema,
        name,
        apiId: API.id
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
