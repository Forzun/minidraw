"use client";

import { Sacramento } from "next/font/google";
import { useEffect, useRef } from "react";

export default function Canvas(){ 
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d"); 

        if(!ctx){ 
            return;
        }

        let click = false;
        let startY = 0 ;
        let startX = 0;

        canvas?.addEventListener("mousedown", (e) => { 
            click = true;
            startY = e.clientY; 
            startX = e.clientX;
        })

        canvas?.addEventListener("mouseup", (e) => { 
            click = false
        })

        canvas?.addEventListener("mousemove", (e) => { 
            if(click){ 
                const width = e.clientX - startX; 
                const height = e.clientY - startY;
                console.log(canvas.height)
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.strokeRect(startX, startY, width, height);
            }
        })  
    }, [canvasRef])

    return <div className="w-full h-screen bg-neutral-100">
        <canvas ref={canvasRef} width={500} height={500}></canvas>
    </div>
}

