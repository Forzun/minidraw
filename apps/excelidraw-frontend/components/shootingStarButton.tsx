import { SquarePen } from "lucide-react";
import { BorderBeam } from "./ui/beam";
import { Button } from "./ui/button";


export default function ShootingStar(){ 

    return (
        <Button className="relative md:mt-[4rem] mt-8 flex items-center justify-center overflow-hidden font-normal md:text-sm text-xs rounded-full md:py-2 py-0 md:px-4 px-0 text-neutral-300"  variant={"custom"}>Draw your mind  
            <SquarePen className="scale-75 text-neutral-300" />
            <BorderBeam 
             className="from-transparent via-yellow-500 to-transparent"
            />
        </Button>
    ) 
}
