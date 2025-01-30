import { Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
export const getAllForms = async (_req: Request, res: Response) => {
  const forms = await prisma.form.findMany()
  res.status(200).json(forms)
}
export const formSubmit = async (req: Request, res: Response) => {
  const headers = req.headers
  const query = req.query['api']
  const apiKey = query as string || headers.authorization?.split(' ')[1] as string
  console.log(apiKey);
  if (apiKey == "" || apiKey == undefined) {
    res.json({ "Error": "No api key found" })
  }
  else {
    try {
      const api = await prisma.api.findUnique(
        {
          where: {
            secret: apiKey
          },
          include: {
            project: true,
            Form: true
          }
        }
      )
      // Checking with registered url
      if (headers.host === api?.project.webURL) {
        res.json({ "error": "The Registered host does not match" })
      }
      else if (api) {
        const formschema = JSON.parse(api?.Form[0].formSchema as string)
        const body = req.body
        const newdata = new Object()
        //@ts-ignore
        formschema.map((ele) => newdata[ele.value] = body[ele.value])
        await prisma.formData.create({
          data: {
            data: JSON.stringify(newdata),
            apiId: api?.id
          }
        })
        res.status(200).json({
          "msg": "submited"
        })
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ "Error": "Operation Failed" })
    }
  }
}
