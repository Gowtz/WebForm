
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Clipboard, Pen, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Forms as FormType } from "@/lib/types";
import { ToggleFormSwitch } from "./ToggleFormSwitch";
import { useMutation } from "@tanstack/react-query";
import { deleteForm } from "@/action/forms";
import { EditForm } from "./EditForm";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { capitalizeFirstLetter } from "../Header";


export default function Forms({ forms }: { forms: FormType[] }) {
  const { toast } = useToast()
  const { mutate } = useMutation({
    mutationFn: deleteForm
  })
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

  return (
    <div>
      <ul className="rounded-lg border divide-y">
        {forms?.map((form: FormType) => (
          <li key={form.id}  className="h-16 flex justify-between px-6 items-center  ">
              <h3 className="mx-5 font-bold text-xl ">{capitalizeFirstLetter(form.name)}</h3>
              <div className="flex items-center gap-5">
                <Badge>{form.project.name}</Badge>

                <ToggleFormSwitch isActive={form.isActive} formId={form.id} />
                <div className="buttonGroup flex gap-2 items-center">
                  <EditForm form={form}>
                    <div className="bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 px-4 py-2">
                      <Pen />
                    </div>
                  </EditForm>
                  <Button variant={"secondary"} onClick={async () => mutate({ formId: form.id })}
                    className="hover:bg-destructive hover:text-secondary dark:text-primary"
                  >
                    <Trash />
                  </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="text-stone-400 text-center text-sm my-10">Your forms</h3>
    </div>
  )
}

