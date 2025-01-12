import { Request, Response } from "express";
import { projectSchema } from "../lib/zod";
// import Project from "../model/projects";

export const createProject = async (req: Request, res: Response) => {
  const { projectName, description, webURL } = req.body;
  try {
    const validProjectResponse = projectSchema.parse({
      projectName,
      description,
      webURL,
    });
    // const project = await Project.createProject(validProjectResponse);
    // if (project) {
    //   res.send("Success");
    // } else {
    //   res.send("error while create project");
    // }
  } catch (error) {
    res.send(error);
  }
};
