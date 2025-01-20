import { prisma } from "./client";

export const getAllForms = async()=>{
  const forms = prisma.form.findMany()
  return forms
}
