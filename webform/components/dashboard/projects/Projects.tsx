"use client"
import ToggleProject from "./toggleProject";
import Dropdowns from "./Dropdowns";
import { useStore } from "@/hooks/store";
import { useEffect } from "react";

export default function Projects() {
  const { projects, fetchProjects } = useStore()
  console.log("rendered")
  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])
  return (
    <>
      {
        projects &&

        <ul className={`w-full  divide-y ${projects.length > 0 && "border"} rounded-lg `}>
          {projects.map((project) => (
            <li
              key={project.id}
              className="px-6 h-16 font-semibold flex justify-between  items-center"
            >
              <h3 className="mx-5 font-bold text-xl ">{project.name}</h3>
              <div className="flex items-center gap-3">
                <ToggleProject isActive={project.isActive} id={project.id} />

                <Dropdowns description={project.description as string} webURL={project.webURL} name={project.name} projectId={project.id} />
              </div>
            </li>
          ))}
        </ul>
      }

      {projects && projects.length > 0 ?

        <h3 className="text-stone-400 text-center mt-7 text-sm"> Your projects </h3>
        :

        <h3 className="text-stone-400 text-center mt-7 text-sm"> No Projects yet. Try creating one </h3>
      }
    </>
  )
}
