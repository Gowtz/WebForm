import { Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import { emailSchema } from "../lib/zod";
export const getAllForms = async (_req: Request, res: Response) => {
  const forms = await prisma.form.findMany()
  res.status(200).json(forms)
}
export const formSubmit = async (req: Request, res: Response) => {
  const headers = req.headers
  const query = req.query['api']
  const apiKey = query as string || headers.authorization?.split(' ')[1] as string
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

      if (!api) {
        throw new Error("The API key is not valid")
      }

      // Checking with registered url
      if (headers.origin !== api?.project.webURL) {
        res.json({ "Error": "The Registered host does not match" })
      }
      // Check for Project active or form active
      else if (api && (api?.project.isActive !== true || api.Form[0].isActive !== true)) {
        res.json({
          "Error": "The Project or the Form is not active this form cannot be submitted",
          "form": `${api?.Form[0].isActive}`,
          "project": `${api?.project.isActive}`
        })
      }
      else if (api) {
        const formschema = JSON.parse(api?.Form[0].formSchema as string)
        const body = req.body
        const newdata = new Object()
        //@ts-ignore
        formschema.map((ele) => newdata[ele.value] = body[ele.value])
        if (newdata.hasOwnProperty('email')) {
          //@ts-ignore
          const validation = emailSchema.safeParse(newdata.email)
          if (validation.error) {
            throw new Error("Email format is not valid")
          }
        }
        await prisma.formData.create({
          data: {
            data: JSON.stringify(newdata),
            apiId: api?.id
          }
        })
        res.send(`
<button onclick="goBack()">Go Back</button>

<script>
  function goBack() {
    window.history.back();
  }
</script>
`)
      }
    } catch (err) {
      res.status(500).json({ "Error": `Operation Failed with ${err}` })
    }
  }
}
