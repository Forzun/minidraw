import { tool } from "@/components/canvas";
import { getExistingCanvas } from "./http";

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

export class Game { 
    
    private canvas: HTMLCanvasElement;
    private ctx : CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    private socket: WebSocket; 
    private click: boolean;
    private startX = 0; 
    private startY = 0;
    private selectedTool: tool = "circle";

    constructor(canvas:HTMLCanvasElement , roomId: string , socket:WebSocket){ 
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket; 
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
        this.click = false;
    }

    destory(){ 
        this.canvas?.removeEventListener("mousedown", this.mouseDownHandler)

        this.canvas?.removeEventListener("mouseup", this.mouseUpHandler )

        this.canvas?.removeEventListener("mousemove", this.mouseMoveHandler) 
    }

    setTool(tool:"circle" | "rectangle" | "line"){ 
        this.selectedTool = tool;
    }

    async init(){ 
        this.existingShapes = await getExistingCanvas(this.roomId);
        this.ctx.fillStyle = "rgba(0 , 0 , 0)"; 
        this.clearCanvas();
    }

    initHandlers(){ 
        this.socket.onmessage = (event) => { 
            const message = JSON.parse(event.data);

            if(message.type == "chat"){ 
                const parsedShape = JSON.parse(message.message); 
                this.existingShapes.push(parsedShape.shape);
                this.clearCanvas();
            }
        }
    }

    clearCanvas(){  
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0 , 0 , 0)"
        this.ctx.fillRect(0, 0, this.canvas.width , this.canvas.height);
        
        this.existingShapes.map((shape) => { 
            if(shape.type == "rect"){
                this.ctx.strokeStyle = "rgba(255 , 255 ,255)"
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            }else if(shape.type == "circle"){ 
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX , shape.centerY , shape.radius, 0 , Math.PI * 2);
                this.ctx.stroke(); 
                this.ctx.closePath();
            }
        })
    }

    mouseDownHandler = (e:MouseEvent) => { 
        this.click = true;
        this.startY = e.clientY; 
        this.startX = e.clientX;
    }

    mouseUpHandler = (e:MouseEvent) => {
            this.click = false
            const width = e.clientX - this.startX; 
            const height = e.clientY - this.startY;
            console.log(width , height)

            const selectedTool = this.selectedTool;
            let shape : Shape | null = null;
            if(selectedTool === "rectangle"){
                shape = {
                    type:"rect", 
                    x:this.startX,
                    y:this.startY,
                    width:width, 
                    height:height
                }
            }else if(selectedTool === "circle"){
                const radius = Math.max(width , height) / 2;
                shape = { 
                    type:"circle", 
                    centerX: this.startX + radius, 
                    centerY: this.startY + radius, 
                    radius: radius
                }
            }
    
            if(!shape){ 
                return;
            }
    
            this.existingShapes.push(shape)
    
            this.socket.send(JSON.stringify({ 
                type:"chat", 
                message:JSON.stringify({ 
                    shape
                }),
                roomId:this.roomId
            }))
    }

    mouseMoveHandler = (e:MouseEvent) =>{ 
        if(this.click){ 
            const width = e.clientX - this.startX; 
            const height = e.clientY - this.startY;
            this.clearCanvas()    
            this.ctx.strokeStyle = "rgba(255 , 255 ,255)"
            //@ts-ignore
            const selectedTool = this.selectedTool;
            if(selectedTool === "rectangle"){ 
                this.ctx.strokeRect(this.startX, this.startY, width, height);
            } else if(selectedTool === "circle"){ 
                const radius = Math.max(width , height) / 2;
                const centerX = this.startX + radius;
                const centerY = this.startY + radius;
                this.ctx.beginPath();
                this.ctx.arc(centerX , centerY , radius , 0 , Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }
    }

    initMouseHandlers(){ 
        this.canvas?.addEventListener("mousedown", this.mouseDownHandler)

        this.canvas?.addEventListener("mouseup", this.mouseUpHandler )

        this.canvas?.addEventListener("mousemove", this.mouseMoveHandler)
    }

}

