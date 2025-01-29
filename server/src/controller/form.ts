import { Request,Response } from "express";
import { prisma } from "../lib/prismaClient";

export const getAllForms = async (_req:Request,res:Response) => {
    const forms = await prisma.form.findMany()
  res.status(200).json(forms)
  }

