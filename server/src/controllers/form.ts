import { Request, Response } from "express";
import { formSchema } from "../lib/zod";
import { findProjectThenCreateProject } from "../lib/prisma";
import { prisma } from "..";
export const createForm = async (req: Request, res: Response) => {
  const { formName, projectId, formDataSchema } = req.body;
  try {
    const validForm = formSchema.parse({ formName, formDataSchema, projectId });
    // const form = await Form.createForm(validForm);
    const form = await findProjectThenCreateProject({ name: validForm.formName, projectId: validForm.projectId, formSchema: validForm.formDataSchema })
    if (form) {
      res.send("success");
    } else {
      res.send("project no found");
    }
  } catch (error) {
    res.send(error);
  }
};

export const getAllForm = async(_req:Request,res:Response)=>{
  try {
   const project = await prisma.form.findMany() 
    res.send(project)
  } catch (error) {
    res.send(error)
  }
}
export const deleteForm = async(req:Request,res:Response) => {
  const {id}= req.params
  try {
    await prisma.form.delete({where:{
      id
    }})
    res.send('Deleted')
  } catch (error) {
    res.send(error)
    
  }
}
export const toggleFormActive = async (req:Request,res:Response)=>{
  const {id,isActive } = req.body
  try {
   await prisma.form.update({where:{
      id
    },
      data:{
        isActive
      }
    })
    res.send("done")
  } catch (err) {
    
  }

}
