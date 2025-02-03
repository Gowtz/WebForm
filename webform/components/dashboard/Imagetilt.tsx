'use client'
import { useEffect } from "react"
import VanillaTilt from 'vanilla-tilt';
import Script from "next/script";
import Image from "next/image";
export default function Card() {
  useEffect(() => {
    // Initialize Tilt.js when the component mounts
    //@ts-ignore
    if (typeof window !== "undefined" && window.VanillaTilt) {
    //@ts-ignore
      VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 25,
        speed: 600,
        glare: true,
        "max-glare": 0.5,
      });
    }
  }, []);

    return (
    <div className=" mx-auto" >
      <Script
        src="https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.0/dist/vanilla-tilt.min.js"
        strategy="afterInteractive" // Load after the page is interactive
      />
      <div className="flex items-center justify-center" data-tilt>
        <Image src={"/dashboard-dark.png"} alt="dashboard" width={1000} height={700} />
      </div>
    </div>
  );
}
