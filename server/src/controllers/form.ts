import { Request, Response } from "express";
import Form from "../model/form";
import { formSchema } from "../lib/zod";
export const createForm = async (req: Request, res: Response) => {
  const { formName, projectId, formDataSchema } = req.body;
  try {
    const validForm = formSchema.parse({ formName, formDataSchema, projectId });
    const form = await Form.createForm(validForm);
    if (form) {
      res.send("success");
    } else {
      res.send("Error while creating form");
    }
  } catch (error) {
    res.send(error);
  }
};
