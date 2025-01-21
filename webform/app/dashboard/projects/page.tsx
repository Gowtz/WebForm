import CreateProject from "@/components/dashboard/projects/CreateProject";
import Projects from "@/components/dashboard/projects/Project";
export default function page() {
  return (
    <div>
      <div className="flex justify-between items-center my-5 mb-10">

      <h2 className="my-5 text-xl font-semibold">List of projects</h2>

      <CreateProject />
      </div>
      <Projects />
    </div>
  )
}

