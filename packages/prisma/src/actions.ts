import { projectSchema } from "@webform/types";
import { prisma } from "./client";
import { generateRandomString } from "./utils";
let BASE_URL = "http://localhost:3000";
export interface formInput {
  name: string;
  projectId: string;
  formSchema: string;
  email:string;
}
export interface projectInput {
  projectName: string;
  description: string;
  webURL: string;
  email:string;
}

export async function getUser(email:string) {
  try {
    const user = await prisma.user.findUnique({
      where:{
        email
      }
    })
    return user
  } catch (error) {
    console.log(error)
    return null
  }
  
}

export async function findProjectThenCreateForm({
  name,
  projectId,
  formSchema,
  email
}:formInput) {
  let user = await getUser(email)
  if(user?.id){
  let project = await prisma.project.findFirst({
    where: {
      id: projectId,
    },
  });
 
  if (project ) {
    const secret = generateRandomString(8);
    const form = await prisma.form.create({
      data: {
        name,
        projectId,
        formSchema,
        projectName: project.name,
        secret,
        userId:user?.id,
        apiURL: `${BASE_URL}/sendform/${secret}`,
      },
    });
    if (form) return form;
    return null;
  }}
  else{
    throw new Error("Unauthorized")
  }
}
export async function createProjectPrisma({projectName,description,webURL,email}:projectInput) {
  try {
    const validProjectResponse = projectSchema.parse({
      projectName,
      description,
      webURL,
    });

  let user = await getUser(email)
  if(user){
    const project = await prisma.project.create({
      data: {
        name: validProjectResponse.projectName,
        userId:user.id,
        webURL: validProjectResponse.webURL,
        description: validProjectResponse.description,
      },
    })
    return project}
  } catch (error) {
    console.log(error);
  }
}
