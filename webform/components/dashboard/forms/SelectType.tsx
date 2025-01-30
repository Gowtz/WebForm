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

const inputTypes = [
  {
    value: "text",
    label: "Text",
  },
  {
    value: "email",
    label: "Email",
  },
  {
    value: "textarea",
    label: "Textarea",
  },
];

export function SelectInputType({val,handleChange,id}:{val:string,id:number,handleChange:({id,type}:{id:number,type:string})=> void}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(val);
  React.useEffect(()=>{handleChange({id,type:value})
  },[value,id])


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
            ? inputTypes.find((inputType) => inputType.value === value)?.label
            : "Select inputType..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search inputType..." />
          <CommandList>
            <CommandEmpty>No inputType found.</CommandEmpty>
            <CommandGroup>
              {inputTypes.map((inputType) => (
                <CommandItem
                  key={inputType.value}
                  value={inputType.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {inputType.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === inputType.value ? "opacity-100" : "opacity-0",
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
