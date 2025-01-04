import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { CONFIG } from "@/lib/config";

export default function Main() {
  const [formData, setFormData] = useState({
    projectName: "",
    url: "",
    description: "",
  });
  function handleSubmit() {
    axios.post(`${CONFIG.BACKEND_URL}/api/project/createProject`);
  }
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(name, value, formData);
  }
  return (
    <div className="p-5 w-full">
      <div className="header flex justify-between w-full mb-5">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Projects</h1>
          <h3>Create project to start sending forms</h3>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button>
              <Plus />
              <span>New Project</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="mx-3">
            <DialogHeader>
              <DialogTitle>Create a project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <Label htmlFor="projectName" className="text-right">
                Project Name
              </Label>
              <Input
                id="projectName"
                name="projectName"
                value={formData.projectName}
                placeholder="Dwane Johnson"
                onChange={handleChange}
                className=" my-5"
              />
              <Label htmlFor="url" className="text-right">
                Url of the project
              </Label>
              <Input
                id="url"
                name="url"
                value={formData.url}
                placeholder="www.google.com"
                onChange={handleChange}
                className="my-5"
              />
              <Label htmlFor="url" className="text-right">
                description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                placeholder="Write about your website"
                onChange={handleChange}
                className="my-5"
              />
              <Button type="submit">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
