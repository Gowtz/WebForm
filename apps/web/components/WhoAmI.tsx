"use client";
import { getuserformSerevr } from "@/actions/form";
import { createProject } from "@/actions/projects";
import { Button } from "@webform/ui/components/button";
import { signIn, signOut } from "next-auth/react";
import React, { useState } from "react";

export default function WhoAmI() {
  const [data, setData] = useState<any>();
  return (
    <>
      <Button
        onClick={async () => {
          setData(await getuserformSerevr());
        }}
      >
        Click Me
      </Button>
      <Button onClick={async() => await signOut()}>
        Signout
      </Button>

      <Button onClick={async() => await signIn()}>
        Signout
      </Button>
      <Button
        onClick={async () => {
          const result = await createProject({
            description: "asdasd",
            projectName: "New Project",
            webURL: "https://gowtz.tech",
          });
          console.log(result);
        }}
      >
        Add Project
      </Button>
      {data && (
        <>
          <p className="bg-blue-300 p-5 rounded-lg">{JSON.stringify(data)}</p>
        </>
      )}
    </>
  );
}
