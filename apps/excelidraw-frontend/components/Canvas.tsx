"use client";

import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";

export default function Canvas({roomId}: { roomId: string}){ 


    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current; 

        if(canvas){ 
            initDraw(canvas , roomId)
        }        

    }, [canvasRef])

    return <div className="w-full h-screen bg-neutral-100">
        <canvas ref={canvasRef} width={2000} height={900}></canvas>
    </div>

}

