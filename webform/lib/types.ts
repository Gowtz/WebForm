export type Projects = {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    webURL: string;
    description: string;
    isActive: boolean;
  };
  
  export type Forms = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    isActive: boolean;
    projectId: string;
    formSchema: string;
  };
