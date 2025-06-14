import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config"
import { prismaClient } from "@repo/db/client"

const wss = new WebSocketServer({port: 8080}); 

interface User { 
    userId:string,
    rooms:string[],
    ws: WebSocket, 
}

const users:User[] = []
 

function checkUser(token: string): string | null { 
    try{ 
        const decoded = jwt.verify(token, JWT_SECRET); 

        if(typeof decoded === "string"){ 
            return null;
        }

        if(!decoded || !decoded.userId){ 
            return null;
        }

        return decoded.userId;
        
    }catch(error){ 
        return null
    }
    return null;
}

let allSocket: User[] = [];

wss.on("connection", async function connection(ws , requset){   
    const url = requset.url; 
    if(!url){ 
        return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]); 
    const token = queryParams.get("token") || "";
    const userId = checkUser(token);

    if(userId == null){ 
        ws.close();
        return; 
    }

    users.push({
        userId: userId, 
        rooms:[], 
        ws:ws
    })

    ws.on("message",async function message(data) { 
        try {
            const parseData = JSON.parse(data as unknown as string)
            
            if(parseData.type === "join_room") { 
                const user = users.find(x => x.ws === ws); // finding the user with ws
                user?.rooms.push(parseData.roomId);
            }
    
            if(parseData.type === "leave_room") { 
                const user = users.find(x => x.ws === ws) 
                if(!user){ 
                    return;
                }
                user.rooms = user?.rooms.filter(x => x === parseData.room); // red == red
            } 
    
            if(parseData.type === "chat") { 
                const roomId = parseData.roomId;
                const message = parseData.message; 
    
                await prismaClient.chat.create({
                    data:{ 
                        roomId: roomId,
                        message: message, 
                        userId:userId
                    }
                })
    
                users.forEach(user => { 
                    if(user.rooms.includes(roomId))
                    user.ws.send(JSON.stringify({
                        type: "chat", 
                        message:message, 
                        roomId:roomId
                    }))
                })
    
            }
        } catch (erorr) {
            console.log(erorr)
        }

    })
})