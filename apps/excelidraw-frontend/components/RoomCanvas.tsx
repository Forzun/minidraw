"use client";

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import Canvas from "./canvas";

export default function RoomCanvas({roomId}: { roomId: string}){ 

    const [socket , setSocket] = useState<WebSocket | null>(null);

    useEffect(() => { 
        const token = localStorage.getItem("token");
        if(!token){ 
            return;
        }
        const ws = new WebSocket(`${WS_URL}?token=${token}`); 
        
        ws.onopen = () => { 
            setSocket(ws)
            ws.send(JSON.stringify({
                type:"join_room", 
                roomId
            }))
        }
    }, [roomId])

    if(!socket){ 
        return <div>
            Wait to connect..
        </div>        
    }

    return <div className="w-full min-h-screen relative">
        <Canvas roomId={roomId} socket={socket} /> 
    </div>
}

