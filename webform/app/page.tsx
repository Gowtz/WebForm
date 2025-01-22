import Getname from "@/components/getname";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <center>
        <h1>Hello</h1>
        <Button>Hello world</Button>
        <Getname />

        <Button>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </center>
    </>
  );
}
