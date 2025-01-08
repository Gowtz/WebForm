import mongoose, { Document, Model } from "mongoose";

// Project Document Type
export interface ProjectType extends Document {
  projectName: string;
  webURL: string;
  description?: string;
}

// Model Document Type
export interface ProjectModelType extends Model<ProjectType> {
  createProject({
    projectName,
    webURL,
    description,
  }: {
    projectName: string;
    webURL: string;
    description?: string;
  }): Promise<ProjectType | null>;
}

// Creating Schema
const projectSchema = new mongoose.Schema<ProjectType>(
  {
    projectName: { type: String, required: true },
    webURL: { type: String, required: true },
    description: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);

// Custom methods that create Project this can be utilized for createProject based on subscription
projectSchema.statics.createProject = async function ({
  projectName,
  webURL,
  description,
}: {
  projectName: string;
  webURL: string;
  description?: string;
}) {
  try {
    return await this.create({ projectName, webURL, description });
  } catch (error) {
    //TODO : rewrite catch later
    console.log(error);
    return null;
  }
};

// Create the Project model
const Project = mongoose.model<ProjectType, ProjectModelType>(
  "Project",
  projectSchema,
);

export default Project;
