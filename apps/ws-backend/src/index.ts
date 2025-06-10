import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({port: 8080}); 

interface User { 
    socket: WebSocket, 
    name:string,
    room:string,
}


let allSocket: User[] = [];

wss.on("connection", function connection(socket){ 

    socket.on("message", (message) => { 
        //@ts-ignore
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);

        if(parsedMessage.type == "join"){ 
            console.log(allSocket);
            console.log("user join`")
            allSocket.push({ 
                socket:socket, 
                name:parsedMessage.payload.name,
                room:parsedMessage.payload.roomId,
            })
        }

        if(parsedMessage.type == "chat"){ 
            console.log("user want's to chat");
            let currentUserRoom = allSocket.find(x => x.socket == socket)?.room;
            
            allSocket.find(socket => { 
                if(socket.room == currentUserRoom){ 
                    socket.socket.send(parsedMessage.payload.message)
                }
            })

        }
    })
})
1