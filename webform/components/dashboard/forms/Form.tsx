"use client"
import { Plus } from "lucide-react";
import { SelectProject } from "./SelectProject";
import { CreateFormDialog } from "./CreateFormDialog";
import React, { useEffect, useState } from "react";
import Forms from "./Forms";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/hooks/store";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Form() {
  const params = useSearchParams()
  const { forms: data, fetchForms, projects } = useStore()
  useEffect(() => {
    fetchForms()
  }, [fetchForms])
  const [filter, setFilter] = useState(params.get('filter') || "")
  function handFilterChange(val: string) {
    setFilter(val)
  }

  const forms = data?.filter(key => filter ? key.project.id == filter : key)
  return (
    <div className="w-full h-full min-h-screen ">
      <div className="buttons flex gap-5 items-center justify-between md:mr-16 h-28 ">
        {
          projects && projects.length > 0 ?

            <CreateFormDialog>
              <div className=" inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-secondary-foreground/20 h-9 px-4 py-2">
                <Plus />
                <span>New Form</span>
              </div>

            </CreateFormDialog>
            :
            <TooltipProvider>
              <Tooltip>

                <TooltipTrigger>

                  <div aria-disabled className="cursor-not-allowed inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                    <Plus />
                    <span>New Form</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Create a project first
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
        }
        <div>
          <span className="font-semibold px-2">Filter by project</span>
          <SelectProject handleState={handFilterChange} />
        </div>
      </div>

      {
        !forms ? <></> :
          <Forms forms={forms} />
      }
    </div>
  );
}
