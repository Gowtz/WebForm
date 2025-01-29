import CreateProject from "@/components/dashboard/projects/CreateProject";
import Projects from "@/components/dashboard/projects/Projects";
import ProjectSkeleton from "@/components/dashboard/projects/ProjectSkeleton";
import { Suspense } from "react";
export default function page() {
  return (
    <div>
      <div className="flex justify-between items-center my-5 mb-10">

      <h2 className="my-5 text-xl font-semibold">List of projects</h2>

      <CreateProject />
      </div>
      <Suspense fallback={<ProjectSkeleton />}>

        <Projects />
      </Suspense>
    </div>
  )
}

