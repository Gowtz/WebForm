import { showApiKey } from "@/action/forms"
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
  const apiKey = await showApiKey()
  return (
    <div>
      <div>
        <div className="flex gap-14 items-center mb-14">
          <h2 className="font-semibold">Your Api Key is </h2>
          <p className="bg-slate-100 dark:bg-zinc-800 rounded-lg py-1 px-3">{apiKey.data && apiKey.data}</p>
        </div>

      </div>

      {
        forms?.api.FormData &&
        <Table>
          <TableCaption>A list of your recent forms Submission.</TableCaption>
          <TableHeader>
            <TableRow key={1}>
              {/* @ts-ignore */}
              {JSON.parse(forms.formSchema).map((ele,index) => <>
                <TableHead key={index}>{ele.value} </TableHead>
              </>)}
            </TableRow>
          </TableHeader>
          <TableBody>
            {forms.api.FormData.map((formdata,index) => (
              <TableRow key={index}>
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

