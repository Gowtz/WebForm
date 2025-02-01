"use client"
import { Input } from "@/components/ui/input";
import { SelectInputType } from "./SelectType";
import { Field } from "./CreateFormDialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface props {
  fields: Field[],
  handleSelectChange: ({ type, id }: { id:number, type: string }) => void,
  handleInputChange: ({ id, value }: { id: number, value: string }) => void
  handleDelete: ({ id}: { id: number}) => void
}
interface prop {
  field: Field,
  handleSelectChange: ({ type, id }: { id:number, type: string }) => void,
  handleInputChange: ({ id, value }: { id: number, value: string }) => void
  handleDelete: ({ id}: { id: number}) => void
}


export default function DynamicForm({ fields, handleInputChange, handleSelectChange,handleDelete }: props) {
  return (
    <>
      {fields.map((field) => (
        <Single field={field} key={field.id} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} handleDelete={handleDelete}/>
      ))}
    </>
  );
}

function Single({ field, handleInputChange ,handleSelectChange,handleDelete}: prop) {
return ( <div className="flex flex-col space-y-2 my-5 px-2">
      <div className="flex gap-5">
        <Input
          type="text"
          id={`field-${field.id}`}
          value={field.value}
          onChange={(e) => handleInputChange({ id: field.id, value: e.target.value })}
          className="border px-2 py-1"
          required
        />
        <SelectInputType val={field.type} handleChange={handleSelectChange} id={field.id} />
        <Button  onClick={()=>{handleDelete({id:field.id})}} className="hover:bg-red-600 hover:text-white">
          <Trash />
        </Button>
      </div>
    </div>
  )
}
