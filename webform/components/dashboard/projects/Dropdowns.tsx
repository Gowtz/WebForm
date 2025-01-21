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

export default function Dropdowns({projectId}:{projectId:string}) {
  const {mutate} = useMutation({
    mutationFn: deleteProject
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Project Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Go to Form</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem className="bg-destructive text-secondary dark:text-primary" onClick={()=>mutate({projectId})}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

