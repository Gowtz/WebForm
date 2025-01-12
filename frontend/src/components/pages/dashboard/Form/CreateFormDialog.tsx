import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { ReactNode, useState } from "react";
import { SelectProject } from "./SelectProject";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DynamicForm from "./DynamicAddInput";
export type Field = {
  id: number;
  label: string;
  value: string;
};

export const CreateFormDialog = ({ children }: { children: ReactNode }) => {
  const [fields, setFields] = useState<Field[]>([
    { id: 1, label: "Field 1", value: "" },
  ]);

  const handleAddField = () => {
    const newField: Field = {
      id: fields.length + 1,
      label: `Field ${fields.length + 1}`,
      value: "",
    };
    setFields((prevFields) => [...prevFields, newField]);
  };
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className=" w-full max-w-xl  overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mb-10">Create a Form</DialogTitle>
          <div>
            <form action="">
              <div className="flex flex-col gap-7">
                <div>
                  <Label>Form Name</Label>
                  <Input placeholder="Form name" className="mt-5" />
                </div>
                <div>
                  <Label>Select Project</Label>
                  <br />
                  <div className="my-5">
                    <SelectProject />
                  </div>
                  <Button type="button" onClick={handleAddField}>
                    Add Field
                  </Button>
                  <div className="ele max-h-[400px] overflow-y-scroll my-5">
                    <DynamicForm fields={fields} setFields={handleAddField} />

                  </div>
                </div>
                <Button>Create</Button>
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
