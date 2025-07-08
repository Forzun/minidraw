import { HTTP_BACKEND } from "@/config";
import axios from "axios"

type Shape = { 
    type: "rect";
    x:number; 
    y:number;
    width:number;
    height:number;
} | {
    type: "circle"; 
    x:number; 
    y:number; 
    radius:number;
}

export async function initDraw(canvas: HTMLCanvasElement , roomId: string){
    const ctx = canvas?.getContext("2d"); 

    let existingShapes: Shape[] = await getExistingCanvas(roomId);

    if(!ctx){ 
        return;
    }

    clearCanvas(existingShapes , canvas , ctx);
    
    ctx.fillStyle = "rgba(0 , 0 , 0)"; 
    if(ctx){ 
        ctx.fillRect(0 , 0, canvas?.width, canvas?.height);
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
        const width = e.clientX - startX; 
        const height = e.clientY - startY;
        console.log(width , height)
        existingShapes.push({
            type:"rect", 
            x:startX,
            y:startY,
            width:width, 
            height:height
        })
    })

    canvas?.addEventListener("mousemove", (e) => { 
        if(click){ 3
            const width = e.clientX - startX; 
            const height = e.clientY - startY;
            clearCanvas( existingShapes , canvas , ctx )   
            ctx.strokeStyle = "rgba(255 , 255 ,255)"
            ctx.strokeRect(startX, startY, width, height);
        }
    })  
}

function clearCanvas(existingShapes: Shape[], canvas:HTMLCanvasElement , ctx:CanvasRenderingContext2D){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0 , 0 , 0)"
    ctx.fillRect(0, 0, canvas.width , canvas.height); 
    
    existingShapes.map((shape) => { 
        if(shape.type == "rect"){
            ctx.strokeStyle = "rgba(255 , 255 ,255)"
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
    })


}

async function getExistingCanvas(roomId: string){
    const res = await axios.get(`${HTTP_BACKEND}/${roomId}`); 
    const message = res.data.message;

    const shapes = message.map((x: {message: string}) => { 
        const messageData = JSON.parse(x.message);
        return messageData;
    })

    return shapes;
}



