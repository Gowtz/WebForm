import Getname from "@/components/getname";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <>
      <center>
        <h1>Hello</h1>
        <Button>Hello world</Button>
        <Getname />

      </center>
    </>
  );
}
