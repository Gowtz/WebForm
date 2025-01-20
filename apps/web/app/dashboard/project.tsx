import { Switch } from "@webform/ui/components/switch"
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@webform/ui/components/dropdown-menu";
import { getAllProject } from "@/actions/projects";
export default async function Projects() {


  const  projects = await getAllProject()

  return (
    <>
      <h2 className="my-5">List of projects</h2>
      {
        projects &&

        <ul className="w-full rounded-lg border divide-y">
          {projects.map((project, index) => (
            <li
              key={index}
              className="px-10 py-6 font-semibold flex justify-between"
            >
              <h3>{project.name}</h3>
              <div className="flex items-center gap-3">
                <Switch id="Active" checked={project.isActive} />
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Project Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Go to Form</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem  className="bg-destructive text-secondary dark:text-primary">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </li>
          ))}
        </ul>
      }
    </>
  )
}

