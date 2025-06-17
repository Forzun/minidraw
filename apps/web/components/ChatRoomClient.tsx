"use client"

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";


export function ChatRoomClient({message , id} : {
    message: {message: string}[] ; 
    id: string
}){ 
    const [chats , setChats] = useState(message);
    const {loading , socket} = useSocket()
    const [currentMessage , setCurrentMessage] = useState("");

    useEffect(() => { 
        if(socket && !loading){ 
            socket.onmessage = (event) => { 

                socket.send(JSON.stringify({ 
                    type: "join_room",
                    roomId: id
                }))

                const parseData = JSON.parse(event.data);
                if(parseData.type === "chat"){ 
                    setChats(c => [...c , {message : parseData.message}]);
                }
            }
        }
    }, [loading , socket , id])
    
    return <div>
        {message.map(m => <div>{m.message}</div>)}

        <input type="text" value={currentMessage} onChange={e => { 
            setCurrentMessage(e.target.value);
        }} ></input>

        <button onClick={() => { 
            socket?.send(JSON.stringify({ 
                type:"chat", 
                roomId: id, 
                message:currentMessage
            }))

            setCurrentMessage("");
        }}>Send message</button>
    </div>
}