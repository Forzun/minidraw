import axios from "axios";

export async function getCanvas(slug : string){    
    const res = await axios.get(`http://localhost:3002/room/${slug}`);
    const room = res.data.room;
    console.log(room);

    return room;
}