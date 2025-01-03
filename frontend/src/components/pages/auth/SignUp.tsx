import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONFIG } from "@/lib/config";
import { Label } from "@radix-ui/react-label";
export default function SignUp() {
  return (
    <div className="login flex-1 flex flex-col p-10 w-full max-w-[400px] ">
      <h1 className="text-2xl mb-5">Login</h1>
      <div className="inputs">
        <Label>Name</Label>
        <Input type="text" className="mt-1 mb-4" />
        <Label>Email</Label>
        <Input type="text" className="mt-1 mb-4" />
        <Label>Password</Label>
        <Input type="password" className="mt-1 mb-4" />
        <Button type="submit" className="w-full">
          Submit
        </Button>
        <h2 className="text-center my-3">or</h2>
        <div className="flex flex-col gap-3 w-full">
          <Button variant="secondary">
            <a
              href={`${CONFIG.BACKEND_URL}/api/auth/google`}
              className="w-full flex items-center justify-center gap-3"
            >
              <img src="/google.svg" alt="google" width={24} />
              <span>Google</span>
            </a>
          </Button>

          <Button className="w-full">
            <a
              href={`${CONFIG.BACKEND_URL}/api/auth/github`}
              className="w-full flex items-center justify-center gap-3"
            >
              <img src="/github.png" alt="Github" width={20} />{" "}
              <span>Github</span>
            </a>
          </Button>
        </div>
      </div>
      <div className="bottom-text mt-auto">
        Already Have Account?{" "}
        <a
          href="/auth?type=signin"
          className="text-primary-foreground bg-secondary-foreground p-1.5 px-2 rounded-md"
        >
          Sign In
        </a>
      </div>
    </div>
  );
}
