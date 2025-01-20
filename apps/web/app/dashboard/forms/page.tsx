import { createForm, getAllForm } from "@/actions/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@webform/ui/components/accordion";
import { Badge } from "@webform/ui/components/badge";
import { Switch } from "@webform/ui/components/switch";
import { Button } from "@webform/ui/components/button";
import { Pen, Trash } from "lucide-react";
import { Clipboard } from "lucide-react";
export default async function page() {
  const forms = await getAllForm();
  return (
    <div>
      <ul className="border rounded-lg divide-y">
        {forms?.map((form) => (
          <li key={form.id}>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <div className="flex justify-between px-10 py-5 items-center">
                  <AccordionTrigger>
                    <h3 className="mx-5 font-bold">{form.name}</h3>
                  </AccordionTrigger>
                  <div className="flex items-center gap-5">
                  <Badge>{form.projectName}</Badge>
                    <Switch
                      checked={form.isActive}

                    />
                    <div className="buttonGroup flex gap-2 items-center">
                      <Button variant={"secondary"}>
                        <Pen />
                      </Button>
                      <Button

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
    </div>
  );
}
