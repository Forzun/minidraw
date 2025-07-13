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
} | {
    type:"line"; 
    startX:number; 
    startY:number;
    y:number;
    x:number;
} | { 
    type: "pencil"; 
    x:number;
    y:number;
    path:{x:string , y:string}[];
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
    private selectedTool: tool = "pencil";
    private currentPath: {x: number , y: number}[] = [];

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

    setTool(tool:"circle" | "rectangle" | "pencil" | "line"){ 
        this.selectedTool = tool;
    }

    async init(){ 
        this.existingShapes = await getExistingCanvas(this.roomId);
        this.ctx.fillStyle = "rgba(0 , 0 , 0)"; 
        this.clearCanvas();

        this.ctx.beginPath(); 
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
        if(this.selectedTool === "pencil"){ 
            this.currentPath = [{x: e.clientX , y: e.clientY}];
            this.ctx.beginPath();
            this.ctx.moveTo(e.clientX , e.clientY);
        }
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
            } else if(selectedTool === "pencil"){ 
                shape ={ 
                    type: "pencil", 
                    x: this.currentPath[0].x,
                    y: this.currentPath[0].y, 
                    path: this.currentPath.map((pt) => ({
                        x: pt.x.toString(),
                        y: pt.y.toString(),
                    })),
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
            }else if(selectedTool === "pencil"){
                this.currentPath.push({x: e.clientX , y: e.clientY});
                this.ctx.lineTo(e.clientX, e.clientY);
                this.ctx.stroke();
                console.log(this.currentPath);
            } 
        }
    }

    initMouseHandlers(){ 
        this.canvas?.addEventListener("mousedown", this.mouseDownHandler)

        this.canvas?.addEventListener("mouseup", this.mouseUpHandler )

        this.canvas?.addEventListener("mousemove", this.mouseMoveHandler)
    }

}
