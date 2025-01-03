import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Main() {
  return (
    <div className="p-5 w-full">
      <div className="header flex justify-between w-full mb-5">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Projects</h1>
          <h3>Create project to start sending forms</h3>
        </div>
        <Button>
          <Plus />
          <span>New Project</span>
        </Button>
      </div>
    </div>
  );
}
