'use server'

import { createProjectPrisma, getUser, prisma } from "@webform/prisma"
import { getServerSession } from "next-auth"
export interface projectInput {
  projectName: string;
  description: string;
  webURL: string;
}

export const getAllProject = async () =>{
    const session = await getServerSession()
    if(session?.user?.email){

        const user = await getUser(session.user.email)
        const projects = await prisma.project.findMany({where:{
            userId:user?.id
        }})
        return projects
    }
    else{
        return null
    }
}

// Create Project
export const createProject = async ({
  description,
  projectName,
  webURL,
}: projectInput) => {
  try {
    const session = await getServerSession();
    if (session?.user?.email) {
       await createProjectPrisma({
        description,
        projectName,
        webURL,
        email: session.user.email,
      });
      return { msg: "Done" };
    } else {
      return { error: "Unauthorized" };
    }
  } catch (error) {
    console.log(error);
    return { error: "Unauthorized" };
  }
};

