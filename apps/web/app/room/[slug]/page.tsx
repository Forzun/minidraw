import axios from "axios";
import { BACKEND_URL } from "../../config";
import CharRoom from "../../../components/CharRoom";

async function getRoomId(slug: string){ 
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    return response.data.room.id;
}

export default async function ChatRoom({params}: {params: {slug: string}}){
    const roomId = await getRoomId(params.slug);

    return <CharRoom id={roomId}></CharRoom>
}   