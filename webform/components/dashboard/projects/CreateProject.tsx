"use client"
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
import { useMutation } from "@tanstack/react-query";
import { addProject } from "@/action/projects";
export default function CreateProject() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    projectName: "",
    webURL: "",
    description: "",
  });
  // TODO: also handle project limit
  const { mutate } = useMutation({ mutationFn: addProject })
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    mutate({ name: formData.projectName, description: formData.description, webURL: formData.webURL })
    setIsOpen(false)
    setFormData(
      {
        projectName: "",
        webURL: "",
        description: "",
      }
    )
    console.log(formData)
  }
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <div className=" inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
            <Plus />
            <span>New Project</span>
          </div>
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
              placeholder="My Project"
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


