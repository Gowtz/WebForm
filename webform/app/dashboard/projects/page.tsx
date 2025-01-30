import CreateProject from "@/components/dashboard/projects/CreateProject";
import Projects from "@/components/dashboard/projects/Projects";
export default function page() {
  return (
    <div>
      <div className="flex justify-between items-center  h-28">

      <h2 className="my-5 text-xl font-semibold">List of projects</h2>

      <CreateProject />
      </div>
        <Projects />
    </div>
  )
}

