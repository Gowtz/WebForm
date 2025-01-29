import { Skeleton } from "@/components/ui/skeleton";

export default function FormSkeleton() {
  return (
    <ul  className="space-y-3">
      <Skeleton className=" py-12 rounded-lg w-full" />
      <Skeleton className=" py-12 rounded-lg w-full" />
      <Skeleton className=" py-12 rounded-lg w-full" />
      <Skeleton className=" py-12 rounded-lg w-full" />
    </ul>
  )
}

