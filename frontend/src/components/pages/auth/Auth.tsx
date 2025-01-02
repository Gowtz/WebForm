import { Card } from "@/components/ui/card";
import SignIn from "./SignIn";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SignUp from "./SignUp";

export default function Auth() {
  const [currentAuth, setCurrentAuth] = useState<"signin" | "signup">("signin");
  const [searchparams] = useSearchParams();
  useEffect(() => {
    const authType = searchparams.get("type");

    if (authType === "signin" || authType === "signup") {
      setCurrentAuth(authType);
    }
  }, [searchparams]);
  return (
    <>
      <div className="body flex justify-center items-center h-screen w-full bg-primary-foreground px-5">
        <Card className="w-full md:max-w-[1440px]  min-h-[70vh] flex justify-center">
          {/* Sign In*/}
          {currentAuth === "signin" && <SignIn />}
          {currentAuth === "signup" && <SignUp />}
          <img
            src="/Login.svg"
            alt="Login"
            className=" md:w-[300px] lg:w-[500px] xl:w-[700px] px-20 hidden md:block flex-0"
          />
        </Card>
      </div>
    </>
  );
}
