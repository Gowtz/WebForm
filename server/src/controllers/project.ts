import { Request, Response } from "express";
import { projectSchema } from "../lib/zod";
import { prisma } from "..";
// import Project from "../model/projects";

export const createProject = async (req: Request, res: Response) => {
  const { projectName, description, webURL } = req.body;
  try {
    const validProjectResponse = projectSchema.parse({
      projectName,
      description,
      webURL,
    });
    const project = await prisma.project.create({data:{name:validProjectResponse.projectName,webURL:validProjectResponse.webURL, description:validProjectResponse.description}})
    if (project) {
      res.send("Success");
    } else {
      res.send("error while create project");
    }
  } catch (error) {
    console.log(error)
    res.send(error);
  }
};

export const getAllProject = async(_req:Response,res:Response)=>{
  try {
   const project = await prisma.project.findMany() 
    res.send(project)
  } catch (error) {
    res.send(error)
  }
}
