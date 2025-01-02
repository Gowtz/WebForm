import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
export default function SignIn() {
  return (
    <div className="login flex-1 flex flex-col p-10 w-full max-w-[400px] ">
      <h1 className="text-2xl mb-5">Login</h1>
      <div className="inputs">
        <Label>Email</Label>
        <Input type="text" className="mt-2 mb-5" />
        <Label>Password</Label>
        <Input type="password" className="mt-2 mb-5" />

        <Button type="submit" className="w-full">
          Submit
        </Button>
        <h2 className="text-center my-3">or</h2>

        <div className="flex flex-col gap-3">
          <Button variant="secondary">
            <img src="/google.svg" alt="google" width={24} />
            Google
          </Button>
          <Button>
            <img src="/github.png" alt="Github" width={20} /> Github
          </Button>
        </div>
      </div>
      <div className="bottom-text mt-auto">
        Dont Have an account?{" "}
        <a
          href="/auth?type=signup"
          className="text-primary-foreground bg-secondary-foreground p-1.5 px-2 rounded-md"
        >
          Sign up
        </a>
      </div>
    </div>
  );
}
