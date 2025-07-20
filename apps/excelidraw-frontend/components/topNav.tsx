"use client"
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

export default function TopNav() {


  return <div className="w-full sticky top-0 z-10 bg-black/30 backdrop-blur-sm ">
        <nav className="flex min-h-[6vh] max-w-[1400px] m-auto items-center md:px-17 px-10 z-30 justify-between gap-4 border-b border-border/30 border-dashed">
      <Link href="/#">
        <span className="md:text-lg text-sm cursor-pointer">MindDraw</span>  
      </Link>
      <div>
        <Button onClick={() => redirect("/signin")} className="cursor-pointer" variant={"custom"}>Login</Button>
      </div>
    </nav>
  </div>
}
