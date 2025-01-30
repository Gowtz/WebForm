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
import { editForm } from "@/action/forms";
import { Forms } from "@/lib/types";
import { useStore } from "@/hooks/store";
export type Field = {
  id: number;
  value: string;
  type:string;
};

export const EditForm= ({ children ,form}: { children: ReactNode ,form:Forms}) => {
const [isOpen,setIsOpen] = useState(false)
  const {fetchForms} = useStore()
  const [formData, setFormData] = useState({
    formName: form.name,
    formDataSchema:JSON.parse(form.formSchema),
    projectId: form.project.id,
  })
  const { mutate } = useMutation({
    mutationFn: editForm,
    onSuccess:fetchForms
  })
  const [fields, setFields] = useState<Field[]>(
    JSON.parse(form.formSchema),
  );
  useEffect(() => {
    setFormData(prev => ({ ...prev, formDataSchema: JSON.stringify(fields) }))
  }, [fields])


  const handleAddField = () => {
    const newField: Field = {
      id: fields.length + 1,
      value: "",
      type:"text"
    };
    setFields((prevFields) => [...prevFields, newField]);
  }

  const handleInputChange = ({id,value}:{id: number, value: string}) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, value} : field,
      ),
    );
  }

  const handleDelete= ({id}:{id: number}) => {
    setFields((prevFields) =>
      prevFields.filter((field) =>
        field.id != id 
      ),
    );
  }
  const handleSelectChange= ({id,type}:{id: number,type:string}) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field,type:type } : field,
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
    mutate({projectId:formData.projectId,name:formData.formName,formSchema:formData.formDataSchema,formId:form.id})
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
                  <Input placeholder="Form name" className="mt-5" id="formName" name="formName" value={formData.formName} onChange={handleChange} />
                </div>
                <div>
                  <Label>Select Project</Label>
                  <SelectProject id={form.project.id} handleState={handleSelect} />
                  <br />
                  <div className="my-5">
                  </div>
                  <Button type="button" onClick={handleAddField}>
                    Add Field
                  </Button>
                  <div className="ele max-h-[400px] overflow-y-scroll my-5">
                    <DynamicForm fields={fields} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} handleDelete={handleDelete}/>
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
