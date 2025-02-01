import { getFormsDataById } from "@/action/fromData"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
export default async function Page({ params }: { params: Promise<{ formid: string }> }) {
  const form = (await params).formid
  const forms = await getFormsDataById({ id: form })
  return (
    <div>

      {
        forms?.api.FormData &&

        <Table>
          <TableCaption>A list of your recent forms Submission.</TableCaption>
          <TableHeader>
            <TableRow>
              {/* @ts-ignore */}
              {JSON.parse(forms.formSchema).map((ele) => <>
                <TableHead>{ele.value}</TableHead>
              </>)}
            </TableRow>
          </TableHeader>
          <TableBody>
            {forms.api.FormData.map((formdata) => (
              <TableRow key={formdata.id}>
                {JSON.parse(forms.formSchema)?.map((ele: string, index: number) =>
                  <TableCell className="font-medium" key={index}>
                    {/* @ts-ignore */}
                    {JSON.parse(formdata.data)[ele.value]}
                  </TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      }
    </div>
  )
}

