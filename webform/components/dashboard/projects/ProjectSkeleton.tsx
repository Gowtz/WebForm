import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectSkeleton() {
  return (
    <ul  className="space-y-3">
      <Skeleton className=" py-9 rounded-lg w-full" />
      <Skeleton className=" py-9 rounded-lg w-full" />
      <Skeleton className=" py-9 rounded-lg w-full" />

    </ul>
  )
}

