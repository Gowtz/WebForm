import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SelectInputType } from "./SelectType";

type Field = {
  id: number;
  label: string;
  value: string;
};

export default function DynamicForm() {
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

  const handleInputChange = (id: number, value: string) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, value } : field,
      ),
    );
  };

  return (
    <>
      {fields.map((field) => (
        <div key={field.id} className="flex flex-col space-y-2 my-5 px-2">
          <label htmlFor={`field-${field.id}`}>{field.label}</label>
          <div className="flex gap-5">
            <Input
              type="text"
              id={`field-${field.id}`}
              value={field.value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className="border px-2 py-1"
              required
            />
            <SelectInputType />
          </div>
        </div>
      ))}
      <Button type="button" onClick={handleAddField}>
        Add Field
      </Button>
    </>
  );
}
