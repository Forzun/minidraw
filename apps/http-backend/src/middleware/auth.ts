import { NextFunction, Request , Response } from "express";
import jwt from "jsonwebtoken"; 


export const userMiddleware = (req:Request , res: Response , next:NextFunction) => { 
    try{ 
        const header = req.headers['authorization'];
        console.log(header)

        const decode = jwt.verify(header as string , "SECRET");
        console.log(decode)

        if(decode){ 
            //@ts-ignore
            req.userId = decode.userId; 
            next();
        }else{ 
            res.json({     
                message:"Token in invalid"
            })
        }

    }catch(error){ 
        res.json({
            error:error
        })  
    }

}
