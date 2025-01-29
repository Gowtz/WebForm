import { getAllProject } from "@/action/projects";
import ToggleProject from "./toggleProject";
import Dropdowns from "./Dropdowns";

export default async function Projects() {

  const projects = await getAllProject()
  return (
    <>

    
        {
          projects &&


          <ul className={`w-full  divide-y ${projects.length >0 && "border"} rounded-lg `}>
            {projects.map((project) => (
              <li
                key={project.id}
                className="px-10 py-6 font-semibold flex justify-between "
              >
                <h3>{project.name}</h3>
                <div className="flex items-center gap-3">
                  <ToggleProject isActive={project.isActive} id={project.id} />

                  <Dropdowns description={project.description as string} webURL={project.webURL} name={project.name} projectId={project.id} />
                </div>
              </li>
            ))}
          </ul>
        }

      {projects.length > 0 ?

        <h3 className="text-stone-400 text-center mt-7 text-sm"> Your projects </h3>
        :

        <h3 className="text-stone-400 text-center mt-7 text-sm"> No Projects yet. Try creating one </h3>
      }
    </>
  )
}
