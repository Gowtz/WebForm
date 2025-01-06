import mongoose, { Document, Model, Schema } from "mongoose";

// Form Document Type
export interface FormType extends Document {
  formName: string;
  projectId: mongoose.Types.ObjectId;
  formDataSchema: string;
  timestamps: boolean;
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
  }): Promise<void>;
}

// Creating Schema
const formSchema = new mongoose.Schema<FormType>({
  formName: { type: String, required: true },
  projectId: {
    types: Schema.Types.ObjectId,
    ref: "Project",
  },
  formDataSchema: { types: String, required: true },
  timestamps: true,
});

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
  this.create({ formName, formDataSchema, projectId });
};

// Create the Form model
const Form = mongoose.model<FormType, FormModelType>("Form", formSchema);
export default Form;
