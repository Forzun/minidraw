import express from "express"; 
import jwt from "jsonwebtoken";
import { userMiddleware } from "./middleware/auth";
import { JWT_SECRET } from "./config";

const app = express(); 

app.use(express.json());

app.post("/signup", function(req ,res){ 

    res.json({ 
        userId:123
    })
})

app.post("/signin", userMiddleware , function(req , res) { 
    
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

        res.json({ 
            roomId:123
        })
         
    }catch(error){ 

    }
})
 

app.listen(3002);