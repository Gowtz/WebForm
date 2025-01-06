import mongoose, { Document, Model } from "mongoose";

// Project Document Type
export interface ProjectType extends Document {
  formName: string;
  webURL: string;
  description?: string;
  timestamps: boolean;
}

// Model Document Type
export interface ProjectModelType extends Model<ProjectType> {
  createProject({
    formName,
    webURL,
    description,
  }: {
    formName: string;
    webURL: string;
    description?: string;
  }): Promise<void>;
}

// Creating Schema
const projectSchema = new mongoose.Schema<ProjectType>({
  formName: { type: String, required: true },
  webURL: { type: String, required: true },
  description: { type: String, default: null },
  timestamps: true,
});

// Custom methods that create Project
projectSchema.statics.createProject = async function ({
  formName,
  webURL,
  description,
}: {
  formName: string;
  webURL: string;
  description?: string;
}) {
  this.create({ formName, webURL, description });
};

// Create the Project model
const Project = mongoose.model<ProjectType, ProjectModelType>(
  "Project",
  projectSchema,
);

export default Project;
