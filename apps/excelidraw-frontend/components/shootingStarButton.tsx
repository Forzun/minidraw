import { BorderBeam } from "./ui/beam";
import { Button } from "./ui/button";


export default function ShootingStar(){ 

    return (
        <Button className="relative md:mt-[4rem] overflow-hidden font-normal rounded-full py-2 px-4" size={"sm"}  variant={"custom"}>Draw your mind
            <BorderBeam 
             className="from-transparent via-yellow-500 to-transparent"
            />
        </Button>
    )
}
