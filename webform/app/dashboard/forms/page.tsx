import { getAllForms } from "@/action/forms";
import Form from "@/components/dashboard/forms/Form";

export default async function page() {
  const forms = await getAllForms()
  return (
    <div>

      {forms &&
        <Form data={forms}/>
      }
    </div>
  )
}

