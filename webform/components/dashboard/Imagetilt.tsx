'use client'
import Script from "next/script";
import Image from "next/image";
export default function Card() {

    return (
    <div className=" mx-auto  overflow-hidden " >
      <Script
        src="https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.0/dist/vanilla-tilt.min.js"
        strategy="afterInteractive" // Load after the page is interactive
      />
      <div className="flex items-center justify-center aspect-video" data-tilt>
        <Image src={"/dash.jpg"} alt="dashboard" width={1000} height={700} className="rounded-xl"/>
      </div>
    </div>
  );
}
