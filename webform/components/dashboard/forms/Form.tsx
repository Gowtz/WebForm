"use client"
import { Plus } from "lucide-react";
import { SelectProject } from "./SelectProject";
import { CreateFormDialog } from "./CreateFormDialog";
import React, { useState } from "react";
import Forms from "./Forms";
import { useSearchParams } from "next/navigation";
import { Forms as FormType} from "@/lib/types";

export default function Form({data}:{data:FormType[]}) {
  const params = useSearchParams()
  const [filter, setFilter] = useState(params.get('filter') || "")
  function handFilterChange(val:string) {
    setFilter(val)
  }

  const forms = data?.filter(key => filter? key.project.id== filter: key)
  return (
    <div className="w-full hifull min-h-screen p-5">
      <div className="buttons flex gap-5 items-center justify-between md:mr-16 ">
        <CreateFormDialog>
          <div className=" inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
            <Plus />
            <span>New Form</span>
          </div>

        </CreateFormDialog>
        <div>
          <span className="font-semibold px-2">Filter by project</span>
          <SelectProject handleState={handFilterChange} />
        </div>
      </div>

      <h1 className="mt-10 mb-5 text-2xl font-semibold">List of forms</h1>
      {
        !forms ? <></> :
          <Forms forms={forms} />
      }
    </div>
  );
}
