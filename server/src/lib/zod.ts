import { z } from "zod";

export const projectSchema = z.object({
  projectName: z
    .string()
    .min(4, "The Project Name should be atleast 4 character")
    .max(20, "The Project Name should not exceed 20 character"),
  webURL: z.string().url(),
  description: z.string().optional(),
});

export const formSchema = z.object({
  formName: z
    .string()
    .min(4, "The Project Name should be atleast 4 character")
    .max(20, "The Project Name should not exceed 20 character"),
  projectId: z.string(),
  formDataSchema: z.string(),
});
