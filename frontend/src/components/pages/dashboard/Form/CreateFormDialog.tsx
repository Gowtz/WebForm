import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { ReactNode } from "react";
import { SelectProject } from "./SelectProject";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DynamicForm from "./DynamicAddInput";

export const CreateFormDialog = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-10">Create a Form</DialogTitle>
          <div>
            <form action="">
              <div className="flex flex-col gap-7">
                <div>
                  <Label>Form Name</Label>
                  <Input placeholder="Form name" className="mt-5" />
                </div>
                <div>
                  <Label>Select Project</Label>
                  <br />
                  <div className="mt-5">
                    <SelectProject />
                  </div>

                  <DynamicForm />
                </div>
                <Button>Create</Button>
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
