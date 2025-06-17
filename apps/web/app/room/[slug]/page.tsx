import axios from "axios";
import { BACKEND_URL } from "../../config";
import CharRoom from "../../../components/CharRoom";

async function getRoomId(slug: string){ 
    const response = await axios.get(`http://localhost:3002/room/${slug}`);
    return response.data.room.id;
}

export default async function ChatRoom({params}: {params: {slug: string}}){
    const roomId = await getRoomId(params.slug);
    console.log(roomId)

    return <CharRoom id={roomId}></CharRoom>
}   