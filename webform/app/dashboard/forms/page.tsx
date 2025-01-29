import { getAllForms } from "@/action/forms";
import Form from "@/components/dashboard/forms/Form";
import FormSkeleton from "@/components/dashboard/forms/FormsSkeleton";
import { Suspense } from "react";

export default async function page() {
  const forms = await getAllForms()
  return (
    <div>
      <Suspense fallback={<FormSkeleton />}>

        {forms &&
          <Form data={forms} />
        }
      </Suspense>
    </div>
  )
}

