import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { fetcher } from "@/main";
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
export default function CreateProject() {
  const [isOpen,setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    projectName: "",
    webURL: "",
    description: "",
  });
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    fetcher.post(`/api/project/create`, formData).then(()=> setIsOpen(false))
  }
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(name, value, formData);
  }
  return (
    <div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              id="webURL"
              name="webURL"
              value={formData.webURL}
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
  )
}

