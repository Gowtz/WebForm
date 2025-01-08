import mongoose, { Document, Model, Schema } from "mongoose";

// Form Document Type
export interface FormType extends Document {
  formName: string;
  projectId: mongoose.Types.ObjectId;
  formDataSchema: string;
}

// Model Document Type
export interface FormModelType extends Model<FormType> {
  createForm({
    formName,
    projectId,
    formDataSchema,
  }: {
    formName: string;
    projectId: string;
    formDataSchema: string;
  }): Promise<FormType | null>;
}

// Creating Schema
const formSchema = new mongoose.Schema<FormType>(
  {
    formName: { type: String, required: true },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    formDataSchema: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

// Custom methods that Create Form
formSchema.statics.createForm = async function ({
  formName,
  projectId,
  formDataSchema,
}: {
  formName: string;
  projectId: string;
  formDataSchema: string;
}) {
  if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid projectID");
  }
  try {
    return await this.create({
      formName,
      formDataSchema,
      projectId: new mongoose.Types.ObjectId(projectId),
    });
  } catch (error) {
    //TODO : rewrite catch later
    console.log(error);
    return null;
  }
};

// Create the Form model
const Form = mongoose.model<FormType, FormModelType>("Form", formSchema);
export default Form;
