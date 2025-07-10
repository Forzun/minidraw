"use client";

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import Canvas from "./canvas";

export default function RoomCanvas({roomId}: { roomId: string}){ 

    const [socket , setSocket] = useState<WebSocket | null>(null);

    useEffect(() => { 
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYjNlZDZhMC00NWYxLTQwZTctOTNmNS02MjBlNjA4ODc4MzQiLCJpYXQiOjE3NTE5ODE1Nzd9.3-CvMZbS7wAV_AWULhvyBkSyv7xG9VaPPfDO1MyXel4`); 
        
        ws.onopen = () => { 
            setSocket(ws)
            ws.send(JSON.stringify({
                type:"join_room", 
                roomId
            }))
        }
    }, [])

    if(!socket){ 
        return <div>
            Wait to connect..
        </div>        
    }

    return <div className="w-full min-h-screen relative">
        <Canvas roomId={roomId} socket={socket} /> 
    </div>
}

