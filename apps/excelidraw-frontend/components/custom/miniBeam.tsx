import { cn } from "@/lib/utils";
import { BorderBeam, BorderBeamProps } from "../ui/beam";

interface MiniBeamProps {
    className?: string; 
    size?: number; 
    delay?: number; 
    duration?:number; 
    colorFrom?: string;
    reverse?:boolean;
}

export default function MiniBeam({
    className ,
    size = 50,
    delay = 0,
    duration = 6,
    reverse = false,} : MiniBeamProps){ 

    return <BorderBeam
        size={size}
        delay={delay}
        duration={duration}
        reverse={reverse}
    className={cn("from-transparent via-yellow-500 to-transparent" , className
    )}
   />
}

