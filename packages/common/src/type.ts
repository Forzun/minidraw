import { z } from "zod"; 

export const CreateUserSchema = z.object({ 
    email: z.string().min(3).max(30), 
    password: z.string(), 
    name:z.string(), 
    photo: z.string().optional()
})

export const SigninSchema = z.object({ 
    username: z.string().min(3).max(30), 
    password: z.string(), 
}) 

export const CreateRoomSchema = z.object({ 
    name: z.string().min(2).max(30)
})

export type CreateUserSchema = z.infer<typeof CreateUserSchema> 
export type SigninSchema = z.infer<typeof SigninSchema>
export type CreateRoomSchema = z.infer<typeof CreateRoomSchema>

