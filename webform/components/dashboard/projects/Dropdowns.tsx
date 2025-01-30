"use client"
import { deleteProject } from "@/action/projects";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { EllipsisVertical } from "lucide-react";
import EditProject from "./EditProject";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useStore } from "@/hooks/store";

export default function Dropdowns({ projectId, name, webURL, description }: { projectId: string, name: string, description?: string, webURL: string }) {
  const {fetchProjects} = useStore()
  const { mutate } = useMutation({
    mutationFn: deleteProject,
    onSuccess: fetchProjects
  })
  const [isOpen, setIsOpen] = useState(false)
function setClose(){
    setIsOpen(false)
  }
  return (
    <>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <EditProject projectId={projectId} description={description as string} webURL={webURL} name={name} setClose={setClose}/>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Project Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Go to Form</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
              <DialogTrigger>
                Edit
              </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem className="bg-destructive text-secondary dark:text-primary" onClick={() => mutate({ projectId: projectId })}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </Dialog>
    </>
  )
}

