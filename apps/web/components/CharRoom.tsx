import axios from "axios"
import { BACKEND_URL } from "../app/config"
import { ChatRoomClient } from "./ChatRoomClient"

async function getChats(roomId: string){ 
    const response = await axios.get(`${BACKEND_URL}/chat/${roomId}`)
    return response.data.message
}

export default async function CharRoom({id}: {id: string}){
    const message = await getChats(id)

    return <ChatRoomClient message={message} id={id} ></ChatRoomClient>
}