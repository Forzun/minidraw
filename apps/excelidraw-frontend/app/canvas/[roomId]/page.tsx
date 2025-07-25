import RoomCanvas from "@/components/RoomCanvas";

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

