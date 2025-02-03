import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from "react";
import { SelectProject } from "./SelectProject";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DynamicForm from "./DynamicAddInput";
import { useMutation } from "@tanstack/react-query";
import { createForm } from "@/action/forms";
import { useStore } from "@/hooks/store";
export type Field = {
  id: number;
  value: string;
  type: string
};

export const CreateFormDialog = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { fetchForms } = useStore()
  const [formData, setFormData] = useState({
    formName: "",
    formDataSchema: "",
    projectId: "",
  })
  const { mutate } = useMutation({
    mutationFn: createForm,
    onSuccess: fetchForms
  })
  const [fields, setFields] = useState<Field[]>([
    { id: 1, value: "", type: "text" },
  ]);
  useEffect(() => {
    setFormData(prev => ({ ...prev, formDataSchema: JSON.stringify(fields) }))
  }, [fields])


  const handleAddField = () => {
    const newField: Field = {
      id: fields.length + 1,
      value: "",
      type: "text"
    };
    setFields((prevFields) => [...prevFields, newField]);
  }
  const handleInputChange = ({ id, value }: { id: number, value: string }) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, value } : field,
      ),
    );
  }
  const handleSelectChange = ({ id, type }: { id: number, type: string }) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, type: type } : field,
      ),
    );
  }

  const handleDelete = ({ id }: { id: number }) => {
    setFields((prevFields) =>
      prevFields.filter((field) =>
        field.id != id
      ),
    );
  }
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutate({ projectId: formData.projectId, name: formData.formName, formSchema: formData.formDataSchema })
    setFields([{ id: 1, value: "", type: "text" }])
    setIsOpen(false)
  }
  const handleSelect = (value: string) => {
    setFormData(prev => ({ ...prev, projectId: value }))
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className=" w-full max-w-xl  overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mb-10">Create a Form</DialogTitle>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-7">
                <div>
                  <Label>Form Name</Label>
                  <Input placeholder="Form name" className="mt-5" id="formName" name="formName" value={formData.formName} onChange={handleChange} required />
                </div>
                <div>
                  <Label>Select Project</Label>
                  <SelectProject handleState={handleSelect} />
                  <br />
                  <div className="my-5">
                  </div>
                  <Button type="button" onClick={handleAddField}>
                    Add Field
                  </Button>
                  <div className="ele max-h-[400px] overflow-y-scroll my-5">
                    <DynamicForm fields={fields} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} handleDelete={handleDelete} />
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
