import { Input } from "@/components/ui/input";
import { SelectInputType } from "./SelectType";
import { Field } from "./CreateFormDialog";



export default function DynamicForm({fields, setFields}:{fields:Field[],setFields:React.Dispatch<React.SetStateAction<Field[]>> }) {

  const handleInputChange = (id: number, value: string) => {
    setFields((prevFields) =>
      prevFields.map((field:Field) =>
        field.id === id ? { ...field, value } : field,
      ),

    );
  }

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
    </>
  );
}
