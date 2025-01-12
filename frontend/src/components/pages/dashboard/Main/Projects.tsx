import { Switch } from "@/components/ui/switch"
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { useStore } from "@/hooks/store";
import { useFetchProject } from "@/action/useProjects";

export default function Projects() {
  const { fetchProject } = useFetchProject()
  useEffect(() => {
    fetchProject()
  }, [fetchProject])

  const { projects } = useStore()
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
      }
    </>
  )
}

