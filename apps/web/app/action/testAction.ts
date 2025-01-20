import { prisma } from "@webform/prisma";

export const getProjects = async() =>{
  const project = await prisma.project.findMany()
  return project
}
