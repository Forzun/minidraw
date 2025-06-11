import express from "express"; 
import jwt from "jsonwebtoken";
import { userMiddleware } from "./middleware/auth";
import { JWT_SECRET } from "@repo/backend-common/config"; 
import { CreateRoomSchema, CreateUserSchema, SigninSchema} from "@repo/common/types"

const app = express(); 

app.use(express.json());

app.post("/signup", function(req ,res){ 

    const data = CreateUserSchema.safeParse(req.body); 
    if(!data.success){ 
         res.json({ 
            message:"Incorrect inputs"
        })
        return;
    }
    res.json({ 
        userId:12
    })  
})

app.post("/signin", userMiddleware , function(req , res) { 
    
    const data = SigninSchema.safeParse(req.body); 
    if(!data.success){ 
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