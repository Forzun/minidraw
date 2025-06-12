import express from "express"; 
import jwt from "jsonwebtoken";
import { userMiddleware } from "./middleware/auth";
import { JWT_SECRET } from "@repo/backend-common/config"; 
import { CreateRoomSchema, CreateUserSchema, SigninSchema} from "@repo/common/types"
import { prismaClient } from "@repo/db/client";

const app = express(); 

app.use(express.json());

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

app.post("/signin", userMiddleware , function(req , res) { 
    
    const parseData = SigninSchema.safeParse(req.body); 
    if(!parseData.success){ 
         res.json({ 
            message:"Incorrect inputs"
        }) 
        return;
    }

    

    const userId = 1;
    const token = jwt.sign({ 
        userId:userId,
    }, JWT_SECRET);

    res.json({ 
        token:token,
    })
})

app.post("/room", userMiddleware , function(req , res){ 
    try{
        const data = CreateRoomSchema.safeParse(req.body); 
        if(!data.success){ 
             res.json({ 
                message:"Incorrect inputs"
            })
            return;
        }

        res.json({ 
            roomId:123
        })
         
    }catch(error){ 

    }
})
 

app.listen(3002);