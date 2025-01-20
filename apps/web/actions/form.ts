"use server";
import {
  createProjectPrisma,
  findProjectThenCreateForm,
} from "@webform/prisma";
import { getServerSession } from "next-auth";
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
  console.log(session);
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
