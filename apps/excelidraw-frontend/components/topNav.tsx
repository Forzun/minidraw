"use client"
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

export default function TopNav() {


  return <div className="w-full sticky top-0 z-10 bg-black/30 backdrop-blur-sm ">
        <nav className="flex min-h-[6vh] max-w-[1400px] m-auto items-center px-15 z-30 justify-between gap-4 border-b border-border/30 border-dashed">
      <a href="/#">
        <span className="text-lg cursor-pointer">MindDraw</span> 
      </a>
      <div>
        <Button onClick={() => redirect("/signin")} className="cursor-pointer" variant={"custom"}>Login</Button>
      </div>
    </nav>
  </div>
}
