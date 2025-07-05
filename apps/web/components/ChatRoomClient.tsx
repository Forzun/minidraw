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
    console.log(chats)

    useEffect(() => { 
        if(socket && !loading){ 
            console.log("runnig inside the loop")

            socket.send(JSON.stringify({ 
                type:"join_room", 
                roomId:id
            }))

            socket.onmessage = (event) => {
                console.log("join the room")
                const parseData = JSON.parse(event.data);
                if(parseData.type === "chat"){ 
                    setChats(c => [...c , {message : parseData.message}]);
                    console.log(chats)
                }
            }
        }
    }, [loading , socket , id])
    
    return <div>
        {chats.map(m => <div key={Math.random()}>{m.message}</div>)}

        <input type="text" value={currentMessage} onChange={e => { 
            setCurrentMessage(e.target.value);
        }} ></input>

        <button onClick={() => { 
            socket?.send(JSON.stringify({ 
                type:"chat", 
                message:currentMessage,
                roomId:id
            }))

            setCurrentMessage("");
        }}>Send message</button>
    </div>
}