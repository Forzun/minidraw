import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react"

export default function UseAuth(){ 
    const [user , setUser] = useState(null);
    const [room , setRoom] = useState(null);

    useEffect(() => {
        const fetchUser = async () => { 
              const token = localStorage.getItem("token"); 
              if(!token){ 
                 redirect("/signin");
              }
              const res = await axios.get(`${HTTP_BACKEND}/user`, { 
                  headers:{ 
                    Authorization:token
                  }
              })

              if(res){ 
                const user = res.data;
                setUser(user.data.user);
                setRoom(user.data.rooms);
              }
           }
        fetchUser();
    }, [])

    return { 
        user, 
        room
    }
}

