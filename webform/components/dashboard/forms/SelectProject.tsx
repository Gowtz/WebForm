"use client"
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { getAllProject } from "@/action/projects";
import { usePathname, useRouter } from "next/navigation";

export function SelectProject({ handleState ,id}: { handleState: (value:  string) => void ,id?:string}) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState( "");
  const { data: projects, } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProject,
  });
  React.useEffect(()=>{
    if(id){
      const projectName = projects?.find(project => project.id == id  )
      setValue(projectName?.name || "")
    }

  },[id,projects])
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          
        >
          {value
            ? projects?.find((project) => project.name === value)?.name
            : "Select project..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search project..." />
          <CommandList>
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup>
              {projects?.map((project) => (
                <CommandItem
                  key={project.name}
                  value={project.name}
                  onSelect={(currentValue) => {
                    const curVal = currentValue === value ? "" : currentValue
                    const id = currentValue === value ? "" : project.id
                    setValue(curVal);
                    handleState(id)
                    if (currentValue) {
                      router.push(`${pathname}/?filter=${id}`)
                    }
                    setOpen(false);
                  }}
                >
                  {project.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === project.name ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
