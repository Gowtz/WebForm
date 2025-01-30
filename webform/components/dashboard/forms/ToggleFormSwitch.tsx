"use client"
import { useMutation } from "@tanstack/react-query";
import { toggleActiveForm } from "@/action/forms";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { useStore } from "@/hooks/store";

export const ToggleFormSwitch = ({ isActive, formId }: { isActive: boolean, formId: string }) => {
  const [active, setActive] = useState(isActive)
  const {fetchForms} = useStore()
  const { mutate } = useMutation({
    mutationFn: toggleActiveForm,
    onSuccess:fetchForms
  })
  function handleToggle() {
    mutate({ isActive: !active, formId })
    setActive(prev => !prev)
  }


  return (
    <TooltipProvider>

    <Tooltip>
      <TooltipTrigger asChild>
          <div>

            <Switch checked={active} onCheckedChange={() => handleToggle()} />
          </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{active ? "Turn off the form":"Turn on form"}</p>
      </TooltipContent>
    </Tooltip>
    </TooltipProvider>
  )
}
