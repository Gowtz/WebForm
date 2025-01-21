"use client"
import { toggleActive } from "@/action/projects";
import { Switch } from "@/components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function ToggleProject({ isActive, id }: { isActive: boolean, id: string }) {
  const [activeState,setActiveState] = useState(isActive)
  const { mutate } = useMutation({
    mutationFn: toggleActive
  })
  function handleToggle() {
    setActiveState(prev => !prev)
    mutate({ isActive: !isActive, projectId: id })
  }
  return (
    <Switch id="Active" checked={activeState} onCheckedChange={handleToggle} />
  )
}

