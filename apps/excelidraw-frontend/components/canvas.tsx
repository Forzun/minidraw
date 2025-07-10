import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import IconButton from "./IconButton";
import { Circle, Minus, RectangleHorizontal } from "lucide-react";

type shape = "circle" | "rectangle" | "line";

export default function Canvas({roomId , socket} : {roomId: string , socket:WebSocket}) { 
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selete , setSelect] = useState<shape>("circle");

    useEffect(() => { 
        //@ts-ignore
        window.selectedTool = selete;
    }, [selete])

    useEffect(() => {
        const canvas = canvasRef.current; 

        if(canvas){ 
            initDraw(canvas , roomId , socket )
        }        

    }, [canvasRef])

    return <div className="w-full h-screen relative">
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>     
        <TopBar select={selete} setSelect={setSelect}  />
    </div>
}

function TopBar({select , setSelect} : {select: string , setSelect:(shape: shape) => void}){ 

    return <div className="fixed top-10 left-10"> 
        <div className="flex gap-2">
            <IconButton onClick={() => {setSelect("circle")}} active={select === "circle"} Icon={<Circle />} />  
            <IconButton onClick={() => {setSelect("rectangle")}} active={select === "rectangle"} Icon={<RectangleHorizontal />} />  
            <IconButton onClick={() => {setSelect("line")}} active={select === "line"} Icon={<Minus />} />   
        </div>
    </div>
}



