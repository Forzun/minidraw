import RoomCanvas from "@/components/RoomCanvas";
import { HTTP_BACKEND } from "@/config";
import axios from "axios";

export default async function CanvasPage({params} : { 
params:{ 
    roomId: string; 
    } 
}){ 
    const roomId = (await params).roomId;
    console.log(roomId);

    return <div>
        <RoomCanvas roomId={roomId} /> 
    </div>
}

