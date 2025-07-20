import { SquarePen } from "lucide-react";
import { BorderBeam } from "./ui/beam";
import { Button } from "./ui/button";


export default function ShootingStar(){ 

    return (
        <Button className="relative md:mt-[4rem] mt-8 flex items-center gap-1 justify-center overflow-hidden font-normal md:text-sm md:scale-100 scale-80 rounded-full md:py-2 py-0 md:px-4 px-0 text-neutral-300"  variant={"custom"}>Draw your mind  
            <SquarePen className="md:scale-75 scale-70 text-neutral-300" /> 
            <BorderBeam 
             className="from-transparent via-yellow-500 to-transparent"
            />
        </Button>
    ) 
}