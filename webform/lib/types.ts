export type Projects = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  webURL: string;
  description?: string | null;
  isActive: boolean;
};

export type Forms = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  isActive: boolean;
  project: Projects
  formSchema: string;
  api:Api;
};
export type Api = {
  id:string
  secret:string
}
