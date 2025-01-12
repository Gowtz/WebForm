import Navbar from "./Navbar";
import Projects from "./Main/Projects";
import CreateProject from "./Main/CreateProject";

export default function Main() {

  return (
    <div className="p-5 w-full overflow-y-auto h-full ">
      <Navbar h1="Project" h3="Create a project to send the form" />
     <CreateProject />
{/* End Of dialog*/}

      <Projects />


    </div>
  );
}
