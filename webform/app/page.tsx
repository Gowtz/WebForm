import Card from "@/components/dashboard/Imagetilt";
import Header from "@/components/HeaderLanding";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="mx-auto ">
      <Header />

      <div className="hero relativeh h-[700px] w-full flex flex-col items-center justify-center gap-3">
        <h1 className="text-6xl font-semibold text-center">Effortless Form Handling for Static Websites</h1>
        <h3 className="text-2xl text-neutral-500">No more backend headaches. Collect, manage, and respond to form submissions—all in one place</h3>
        <div className="cta flex gap-5 mt-10">
          <Button variant={'default'}>Get Started </Button>
          <Button variant={'secondary'}>Know More</Button>
        </div>

      </div>

      <Card />


      <div className="relative min-h-screen ">

        <div className="features my-20 flex justify-between max-w-[1400px] mx-auto " id="about">
          <h2 className="text-center text-8xl mb-10 ml-16">Features</h2>
          <div className="flex flex-col justify-between gap-10">
            <div className="tab">
              <h3>One Dashboard,Full Controll</h3>
              <p>View and manage all form submissions from multiple websites in a single app.</p>
            </div>
            <div className="tab">
              <h3>Insights & Analytics </h3>
              <p>Track form performance with submission analytics.</p>
            </div>

            <div className="tab">
              <h3> No Backend Required</h3>
              <p>Just add a simple apikey form endpoint—no need for a server.</p>
            </div>
          </div>
        </div>

        <div className="workings my-40 flex flex-row-reverse justify-between max-w-[1200px] mx-auto">
          <h2 className="text-center text-8xl mb-10">How it works</h2>
          <div className="flex flex-col justify-between gap-10">
            <div className="tab">
              <h3>Add Your Form Endpoint</h3>
              <p>Copy & paste a simple script into your static website.</p>
            </div>
            <div className="tab">
              <h3>Collect & Manage Submissions</h3>
              <p>View all form submissions in your dashboard.</p>
            </div>

            <div className="tab">
              <h3>Automate Responses</h3>
              <p>Send automated confirmation emails to users.</p>
            </div>
          </div>
        </div>

        <div className="absolute -top-32 -left-56  flex items-center justify-center">
          <div className="w-[500px] h-[800px] rounded-full bg-neutral-600 blur-[400px] opacity-40"></div>
        </div>
        <div className="absolute bottom-40 right-20 flex items-center justify-center">
          <div className="w-96 h-96 bg-neutral-500 blur-[200px] opacity-20"></div>
        </div>
      </div>


      <div className="relative plans mb-32" id="pricing">
        <TooltipProvider>
          <h2 className="text-center text-4xl mt-32">What About Plans</h2>
          <div className="flex justify-center gap-20 mt-40">

            <div className="card smalScale">
              <h3>Starter</h3>
              <h4><span>Free</span> </h4>
              <p> Good for Starter and for very minimum projects</p>
              <ul>
                <li><CircleCheckBig />  Upto 5 Projects</li>
                <li><CircleCheckBig />Upto 10 Forms</li>
                <li><CircleCheckBig />Forms Response can be stored upto 6 months</li>
              </ul>
              <Link href={'/signin'}>

                <Button className="my-5 w-full">Start Now</Button>
              </Link>
            </div>
            <div className="card bigScale">
              <h3>Starter</h3>
              <h4><span>$10</span> / month</h4>
              <p>Good for Starter and for very minimum projects</p>
              <ul>
                <li><CircleCheckBig />  Upto 10 Projects</li>
                <li><CircleCheckBig />Upto 25 Forms</li>
                <li><CircleCheckBig />Forms Response can be stored upto 6 months</li>
                <li><CircleCheckBig />Emails you every days if you recive form response</li>
              </ul>
              <div className="text-center flex flex-col">
                <Tooltip >
                  <TooltipContent className="bg-background  text-foreground">
                    Sorry Payment will implement Soon
                  </TooltipContent>
                  <TooltipTrigger>
                    <Button className="my-5 w-full cursor-not-allowed" >Start 14 Days free trail</Button>
                  </TooltipTrigger>
                </Tooltip>
              </div>
            </div>
            <div className="card smalScale">
              <h3>Starter</h3>
              <h4><span>$25</span> / month</h4>
              <p>Good for Starter and for very minimum projects</p>
              <ul>
                <li><CircleCheckBig />  Upto 50 Projects</li>
                <li><CircleCheckBig />Upto 200+ Forms</li>
                <li><CircleCheckBig />Forms Response can be stored upto 6 months</li>
                <li><CircleCheckBig />Emails you every 15mins if you recive form response</li>
              </ul>

              <div className="text-center flex flex-col">
                <Tooltip >
                  <TooltipContent className="bg-background  text-foreground">
                    Sorry Payment will implement Soon
                  </TooltipContent>
                  <TooltipTrigger>
                    <Button className="my-5 w-full cursor-not-allowed" >Start 14 Days free trail</Button>
                  </TooltipTrigger>
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="absolute -top-32 right-56  flex items-center justify-center">
            <div className="w-[500px] h-[800px] rounded-full bg-neutral-600 blur-[400px] opacity-40"></div>
          </div>
          <div className="absolute bottom-16 -left-36 flex items-center justify-center">
            <div className="w-96 h-96 bg-neutral-500 blur-[200px] opacity-40"></div>
          </div>
        </TooltipProvider>
      </div>

      <div className="absolute -top-32 -left-56  flex items-center justify-center">
        <div className="w-[500px] h-[800px] rounded-full bg-neutral-600 blur-[400px] opacity-40"></div>
      </div>
      <div className="absolute bottom-16 right-20 flex items-center justify-center">
        <div className="w-96 h-96 bg-neutral-500 blur-[200px] opacity-40"></div>
      </div>
      <footer className="w-full py-10 bg-black ">
        <div className="container mx-auto">

          <h5 className="text-zinc-400 text-center">Built By <Link href={'https://github.com/gowtz'} className="hover:text-slate-50 text-xl text-zinc-200 transition-all duration-200"> @gowtham</Link> </h5>
        </div>

      </footer>
    </div>


  );
}

