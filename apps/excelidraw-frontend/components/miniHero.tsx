import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import MiniBeam from "./custom/miniBeam";


export default function MiniHero( ){ 

    return <>
                  <h1 className="md:text-5xl lg:text-7xl text-2xl font-bold tracking-tighter bg-gradient-to-tl from-amber-100 to-white bg-clip-text text-transparent md:mt-12 mt-4 ">Think, Create, Repeat</h1>
              <h1 className="md:text-5xl lg:text-7xl text-2xl font-bold tracking-tighter bg-gradient-to-tl from-amber-200 to-slate-300 bg-clip-text text-transparent ">MindDraw a complete 0 to 100</h1>
           <div className="flex items-center justify-center gap-3 md:mt-7 mt-5">
               <Button className="w-full md:py-3 bg-gradient-to-r from-neutral-100 cursor-default hover:from-neutral-200 hover:to-neutral-200  to-zinc-200" variant={"secondary"}>Get Started for free
               <ArrowRight className="text-neutral-800" />
              </Button> 
           </div>
            <div className="md:mt-[8rem] mt-[3rem] p-5  mask-b-from-20% mask-b-to-80%"> 
                <div className="relative">
                   <Image className="border relative border-neutral-600 rounded-lg " alt="heroDark" width={1100} height={100} src={"/hero-dark.png"} />
                    <MiniBeam size={70} duration={6}/>
                </div>
            </div>
        </>
}

