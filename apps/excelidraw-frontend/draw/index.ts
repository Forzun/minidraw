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
    centerX:number; 
    centerY:number; 
    radius:number;
}

export async function initDraw(canvas: HTMLCanvasElement , roomId: string , socket:WebSocket){
    const ctx = canvas?.getContext("2d"); 

    let existingShapes: Shape[] = await getExistingCanvas(roomId);
    console.log(existingShapes)

    if(!ctx){ 
        return;
    }

    socket.onmessage = (event) => { 
        const message = JSON.parse(event.data);
        if(message.type == "chat"){ 
            const parsedShape = JSON.parse(message.message); 
            existingShapes.push(parsedShape.shape);
            clearCanvas(existingShapes , canvas , ctx);
        }
    }

    
    ctx.fillStyle = "rgba(0 , 0 , 0)"; 
    if(ctx){ 
        ctx.fillRect(0 , 0, canvas?.width, canvas?.height);
    }

    clearCanvas(existingShapes , canvas , ctx);
    
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
        //@ts-ignore
        const selectedTool = window.selectedTool;
        let shape : Shape | null = null;
        if(selectedTool === "rectangle"){
            shape = {
                type:"rect", 
                x:startX,
                y:startY,
                width:width, 
                height:height
            }
        }else if(selectedTool === "circle"){
            const radius = Math.max(width , height) / 2;
            shape = { 
                type:"circle", 
                centerX: startX + radius, 
                centerY: startY + radius, 
                radius: radius
            }
        }

        if(!shape){ 
            return;
        }

        existingShapes.push(shape)

        socket.send(JSON.stringify({ 
            type:"chat", 
            message:JSON.stringify({ 
                shape
            }),
            roomId
        }))

    })

    canvas?.addEventListener("mousemove", (e) => { 
        if(click){ 3
            const width = e.clientX - startX; 
            const height = e.clientY - startY;
            clearCanvas( existingShapes , canvas , ctx )   
            ctx.strokeStyle = "rgba(255 , 255 ,255)"
            //@ts-ignore
            const selectedTool = window.selectedTool;
            if(selectedTool === "rectangle"){ 
                ctx.strokeRect(startX, startY, width, height);
            } else if(selectedTool === "circle"){ 
                const radius = Math.max(width , height) / 2;
                const centerX = startX + radius;
                const centerY = startY + radius;
                ctx.beginPath();
                ctx.arc(centerX , centerY , radius , 0 , Math.PI * 2);
                ctx.stroke();
                ctx.closePath();
            }
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
        }else if(shape.type == "circle"){ 
            ctx.beginPath();
            ctx.arc(shape.centerX , shape.centerY , shape.radius, 0 , Math.PI * 2);
            ctx.stroke(); 
            ctx.closePath();
        }
    })

}

async function getExistingCanvas(roomId: string){
    const res = await axios.get(`${HTTP_BACKEND}/chat/${roomId}`); 
    const message = res.data.message;

    const shapes = message.map((x: {message: string}) => { 
        const messageData = JSON.parse(x.message);
        return messageData.shape;
    })

    return shapes;
}



