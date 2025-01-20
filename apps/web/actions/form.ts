"use server";
import { findProjectThenCreateForm, getUser } from "@webform/prisma";
import { getServerSession } from "next-auth";
import { prisma } from "@webform/prisma";
//Interface
export interface formInput {
  name: string;
  projectId: string;
  formSchema: string;
}
export interface projectInput {
  projectName: string;
  description: string;
  webURL: string;
}

export const getuserformSerevr = async () => {
  const session = await getServerSession();
  return session?.user;
};


//Create Form
export const createForm = async ({
  formSchema,
  projectId,
  name,
}: formInput) => {
  try {
    const session = await getServerSession();
    if (session?.user?.email) {
      const form = await findProjectThenCreateForm({
        name,
        formSchema,
        projectId,
        email: session.user.email,
      });
      if (!form) {
        return { error: "ProjectId Not Found" };
      }
    } else {
      return { error: "Unauthorized" };
    }
  } catch (error) {
    console.log(error);
    return { error: "Unauthorized" };
  }
};

export const getAllForm = async()=>{

    const session = await getServerSession()
    if(session?.user?.email){

        const user = await getUser(session.user.email)
        const projects = await prisma.form.findMany({where:{
            userId:user?.id,
            
        }})
        return projects
    }
    else{
        return null
    }
}
