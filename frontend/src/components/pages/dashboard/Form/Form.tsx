import { Switch } from "@/components/ui/switch";
import Navbar from "@/components/pages/dashboard/Navbar";
import { Button } from "@/components/ui/button";
import { Clipboard, Pen, Plus, Trash } from "lucide-react";
import { SelectProject } from "./SelectProject";
import { CreateFormDialog } from "./CreateFormDialog";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/hooks/store";
import { useFetchForm } from "@/action/useForm";

export default function Form() {
  const [filter, setFilter] = useState("")
  const { forms } = useStore()
  const { fetchForm, toggleActiveForm,deleteForm } = useFetchForm()
  const [checked, setChecked] = useState(forms?.map(form => ({ id: form.id, active: form.isActive })))
  const { toast } = useToast();
  const handleCopy = (e: React.MouseEvent<HTMLSpanElement>) => {
    navigator.clipboard
      .writeText(e.currentTarget.innerText)
      .then(() => {
        toast({
          title: "Copied URL",
        });
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  };
  function handleChange(formId: string, isActive: boolean) {
    console.log(isActive)
    toggleActiveForm(formId, isActive)
  }

  useEffect(() => { fetchForm() }, [fetchForm])
  return (
    <div className="w-full hifull min-h-screen p-5">
      <Navbar h1="Forms" h3="Create forms" />
      <div className="buttons flex gap-5 items-center justify-between md:mr-16 ">
        <CreateFormDialog>
          <Button className="flex gap-2 items-center ">
            <Plus />
            <span>New Form</span>
          </Button>
        </CreateFormDialog>
        <div>
          <span className="font-semibold px-2">Filter by project</span>
          <SelectProject handleState={setFilter} />
        </div>
      </div>

      <h1 className="mt-10 mb-5">List of forms</h1>
      <ul className="border rounded-lg divide-y">
        {forms?.map((form, index) => (
          <li key={form.id}>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <div className="flex justify-between px-10 py-5 items-center">
                  <AccordionTrigger>
                    <h3 className="mx-5 font-bold">{form.name}</h3>
                  </AccordionTrigger>
                  <div className="flex items-center gap-5">
                    <Badge>{form.projectId}</Badge>
                    <Switch checked={form.isActive} onCheckedChange={() => handleChange(form.id, form.isActive)} />
                    <div className="buttonGroup flex gap-2 items-center">
                      <Button variant={"secondary"}>
                        <Pen />
                      </Button>
                      <Button onClick={()=>deleteForm(form.id)}
                        variant={"secondary"}
                        className="hover:bg-destructive hover:text-secondary dark:text-primary"
                      >
                        <Trash />
                      </Button>
                    </div>
                  </div>
                </div>
                <AccordionContent className="ml-10 my-3 mx-16 flex gap-10 items-center">
                  <h2 className="font-semibold">FormAction Link</h2>
                  <span
                    className="py-2 px-5 rounded-lg bg-secondary flex gap-3 cursor-pointer items-center "
                    onClick={handleCopy}
                  >
                    http://localhost/asdasd
                    <Clipboard size={15} />
                  </span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
        ))}
      </ul>

      <h3 className="text-primary text-center my-10">Your forms</h3>
    </div>
  );
}
