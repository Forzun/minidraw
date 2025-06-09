import express from "express"; 
import jwt from "jsonwebtoken";

const app = express(); 

app.use(express.json());

app.post("/signup", function(req ,res){ 
    const username = req.body.username;
    const password = req.body.password;

    const token = jwt.sign({ 
        userId:username
    }, "SECRET")

    if(!token){ 
        console.log("token not received")
    }

    res.json({ 
        token:token,
    })
})

app.post("/signin", function(req , res) { 
    try{

         
    }catch(error){ 
        res.status(500).json({ 
            error:error
        })
    }
})



app.listen(3002);