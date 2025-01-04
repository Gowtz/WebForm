import { Button } from "@/components/ui/button";
import { EllipsisVertical, Plus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { CONFIG } from "@/lib/config";
import Navbar from "./Navbar";
import { Switch } from "@/components/ui/switch";
const projects = ["Gowtz.tec", "Jwellery", "Icecream"];

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
    <div className="p-5 w-full overflow-y-auto h-full ">
      <Navbar h1="Project" h3="Create a project to send the form" />
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

      <h2 className="my-5">List of projects</h2>
      <ul className="w-full rounded-lg border divide-y">
        {projects.map((project, index) => (
          <li
            key={index}
            className="px-10 py-6 font-semibold flex justify-between"
          >
            <h3>{project}</h3>{" "}
            <div className="flex items-center gap-3">
              <Switch id="Active" />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Project Action</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Go to Form</DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem className="bg-destructive text-secondary dark:text-primary">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
