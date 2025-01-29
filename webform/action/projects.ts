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
export const deleteProject = async({projectId}:{projectId:string})=>{
  const user = await getServersideUser()
  if(user){
    await prisma.project.delete({
      where:{
        id:projectId
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
// 2. Project limit validation

export const addProject = async ({ name, webURL, description }: { name: string, webURL: string, description: string }) => {
  const user = await getServersideUser()
  const project = await prisma.project.create({
    data: {
      userId: user?.id as string,
      name, webURL, description
    }
  })
  revalidatePath('/dashboard/projects')
  return project
}

export const editProject= async ({ name, webURL, description ,projectId}: { name: string, webURL: string, description: string,projectId:string }) => {
  const user = await getServersideUser()
  const project = await prisma.project.update({
    where:{id:projectId},
    data: {
      userId: user?.id as string,
      name, webURL, description
    }
  })
  revalidatePath('/dashboard/projects')
  console.log(project)
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

