import { Request, Response } from "express";
import { formSchema } from "../lib/zod";
import { findProjectThenCreateProject } from "../lib/prisma";
export const createForm = async (req: Request, res: Response) => {
  const { formName, projectId, formDataSchema } = req.body;
  try {
    const validForm = formSchema.parse({ formName, formDataSchema, projectId });
    // const form = await Form.createForm(validForm);
    const form = await findProjectThenCreateProject({name:validForm.formName,projectId:validForm.projectId,formSchema:validForm.formDataSchema})
    if (form) {
      res.send("success");
    } else {
      res.send("project no found");
    }
  } catch (error) {
    res.send(error);
  }
};
