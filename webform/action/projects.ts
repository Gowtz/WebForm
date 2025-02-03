"use server"
import { prisma } from "@/lib/prismaclient"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

// Todo: add pagination
export const getAllProject = async () => {
  const user = await getServersideUser()
  const projects = await prisma.project.findMany({
    where: {
      userId: user?.id
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
  return projects
}
export const deleteProject = async ({ projectId }: { projectId: string }) => {
  const user = await getServersideUser()
  if (user) {
    await prisma.project.delete({
      where: {
        id: projectId
      }
    })
    revalidatePath('/dashboard/projects')
  }
}

export const toggleActive = async ({ isActive, projectId }: { isActive: boolean, projectId: string }) => {
  const user = await getServersideUser()
  if (user) {
    await prisma.project.update({
      where: {
        id: projectId
      },
      data: {
        isActive
      }
    })
  }
}

// Todo: 1.Parse input with zod 

export const addProject = async ({ name, webURL, description }: { name: string, webURL: string, description: string }) => {
  try {
    const user = await getServersideUser()
    if (user) {
      // const subscription = await prisma.subscription.findFirst({
      //   where: {
      //     userId: user.id
      //   }
      // })
      // if (!subscription || subscription.isActive) {
      //   return { error: "NOT_SUBSCRIBED", errordescription: "No active subscription found" }
      // }
        const countofProjects = await prisma.project.count({
          where: {
            userId: user.id
          }
        })
        if (countofProjects >= 5) {
          return { error: "PROJECT_LIMIT_ERROR", errordescription: "You have reached the project limit for your plan." }
        }

        const project = await prisma.project.create({
          data: {
            userId: user?.id as string,
            name, webURL, description
          }
        })
        return { data: project }
      }
    
  } catch (error) {
    return { error: "INTERNAL_ERROR", errordescription: error instanceof Error ? error.message : String(error) }
  }
}

export const editProject = async ({ name, webURL, description, projectId }: { name: string, webURL: string, description: string, projectId: string }) => {
  const user = await getServersideUser()
  const project = await prisma.project.update({
    where: { id: projectId },
    data: {
      userId: user?.id as string,
      name, webURL, description
    }
  })
  revalidatePath('/dashboard/projects')
  return project
}

export const getServersideUser = async () => {
  const session = await getServerSession()
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string
    }
  })
  return user
}

