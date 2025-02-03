'use client'
import Image from "next/image";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
export default function SignIn() {
  return (
    <div className="w-full h-screen max-h-screen flex ">
      <div className="w-full h-full p-5">
        <div className="w-full h-full  rounded-3xl overflow-hidden relative ">
          <Image src={'/Signin.jpg'} alt="dummy" layout="fill" objectFit="cover" />
        </div>
      </div>
      <div className="w-full h-full">
        <div className="header text-center flex flex-col items-center justify-center w-full h-full ">
          <div className="flex gap-5 items-center mb-5"> <Image className="rounded-lg" width={60} height={60} src={'/Icon.png'} alt="Logo" /> <div className="logo text-4xl">Webform</div></div>
          <p className="text-neutral-300">Get Starter fro doing realy Big</p>
          <div className="w-52 my-14">
            <Button className="w-full scale-125" onClick={()=>signIn('github',{callbackUrl:"/dashboard"})} ><Image src={'/github-mark.png'} alt="github logo" width={24} height={24}/>  SignIn with GitHub</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

