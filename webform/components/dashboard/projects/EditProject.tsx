"use client"
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { editProject } from "@/action/projects";
export default function EditProject({ name, webURL, description, projectId,setClose}: {setClose:()=>void, name: string, webURL: string, description: string, projectId: string }) {
  const [formData, setFormData] = useState({
    projectName: name,
    webURL,
    description
  });
  // TODO: also handle project limit
  const { mutate } = useMutation({ mutationFn: editProject })
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    mutate({ name: formData.projectName, description: formData.description, webURL: formData.webURL, projectId })
    setClose()
  }
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <div>
        <DialogContent className="mx-3">
          <DialogHeader>
            <DialogTitle>Edit a project</DialogTitle>
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
    </div>
  )
}


