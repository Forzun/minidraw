import express from "express"; 
import jwt from "jsonwebtoken";
import { userMiddleware } from "./middleware/auth";
import { JWT_SECRET } from "@repo/backend-common/config"; 
import { CreateRoomSchema, CreateUserSchema, SigninSchema} from "@repo/common/types"
import { prismaClient } from "@repo/db/client";
import cors from "cors";

const app = express(); 

app.use(express.json());
app.use(cors());

app.post("/signup", async function(req ,res){ 
    try{ 
        const ParseData = CreateUserSchema.safeParse(req.body);

        if(!ParseData.success){ 
            res.json({ 
                message:"Incorrect inputs"
            })  
            return;
        }

        const existingUser = await prismaClient.user.findFirst({ 
            where:{
                email:ParseData.data.username
            },
        })

        if(existingUser){ 
            res.status(409).json({ 
                message:"user already exist",
                user:existingUser.id,
            })
            return;
        }

        const user = await prismaClient.user.create({ 
            data:{ 
               email: ParseData.data?.username, 
               password: ParseData.data?.password,
               name: ParseData.data?.name
            }
        })

        if(user){ 
            res.status(200).json({ 
                user:user,
            })
        }else{ 
            res.status(202).json({ 
                message:"Something went wrong",
            })
        }
        
    }catch(error){ 
        res.status(400).json({ 
            error:error
        })
    }
})

app.post("/signin", async function(req , res) { 
    try{ 

        const parseData = SigninSchema.safeParse(req.body); 
        if(!parseData.success){ 
            res.json({ 
                message:"Incorrect inputs"
            }) 
            return;
        }

        const user = await prismaClient.user.findFirst({
            where:{ 
                email: parseData.data.username, 
                password: parseData.data.password,
            }
        })
        console.log(user)

        if(!user){ 
            res.status(403).json({ 
                message:"Not authorized",
            })
            return;
        }

        const token = jwt.sign({ 
             userId:user?.id
        }, JWT_SECRET);

        res.json({ 
            token:token, 
            user:user
        })

    }catch(error){ 
        res.status(400).json({
            error:error
        })
    }
})

app.post("/room", userMiddleware ,async function(req , res){ 
    try{
        const parseData = await CreateRoomSchema.safeParse(req.body);// only name
        if(!parseData.success){ 
             res.json({ 
                message:"Incorrect inputs"
            })
            return;
        }   

        const existRoom = await prismaClient.room.findFirst({ 
            where: {
                slug: parseData.data.name
            }
        })

        if(existRoom){ 
            res.status(400).json({ 
                message:"room already exist with this name", 
                result:{ 
                    room:existRoom.slug,
                    roomId: existRoom.id
                }
            })
        }

        // @ts-ignore
        const userId = req.userId;

        const room = await prismaClient.room.create({ 
            data: {
                slug:parseData.data.name, 
                adminId: userId
            }
        })

        res.status(200).json({  
            roomId: room.id
        })
    }catch(error){ 
        res.status(400).json({ 
            message:"room already exist with this name"
        })
    }
})

app.get("/chat/:roomId", async (req , res) => { 
    try{ 
    const roomId = Number(req.params.roomId);
    const message = await prismaClient.chat.findMany({ 
        where: {
            roomId:roomId
        }, 
        orderBy:{ 
            id:"desc"
        }, 
        take:50
    })
    res.json({ 
        message: message
    })
    }catch(erorr){ 
        console.log(erorr)
    }

})

app.get("/room/:slug", async (req ,res) => { 
    const slug = req.params.slug;
    
    const room = await prismaClient.room.findFirst({ 
        where: { 
            slug:slug,
        }
    })

    res.json({ 
        room:room
    })

})

app.get("/user", userMiddleware , async (req , res) => { 
   try{ 
    //@ts-ignore
    const userId = req.userId; 
    console.log(userId);

    const user = await prismaClient.user.findFirst({
        where:{ 
        id:userId
        }
    })

    const room = await prismaClient.room.findMany({ 
        where: {
            adminId:userId
        }
    })

    if(user){ 
        res.status(200).json({ 
            data: { 
                user:user, 
                rooms:room
            }
        })
    }

   }catch(error){ 
       res.status(400).json({
           error:error
       })
   }

})


app.listen(3002);