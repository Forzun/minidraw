"use client"

import { GalleryVerticalEnd } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react"
import axios from "axios"
import { redirect } from "next/navigation"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){ 
      e.preventDefault(); 

     const uesrname = emailRef.current?.value; 
     const password = passwordRef.current?.value; 

     if(!uesrname || !password){ 
         console.log("invalid"); 
         return;
     }

     console.log(uesrname , password)

     try{ 
      const response = await axios.post("http://localhost:3002/signin" , { 
        username: uesrname, 
        password: password.toString()
      })
      const token = response.data.token; 
      localStorage.setItem("token", token)
      if(token){ 
          redirect("/")
      }
     }catch(error) { 
      console.log(error)
     }

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to MindDraw</h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                ref={emailRef}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            {/* <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                ref={nameRef}
                id="name"
                type="name"
                placeholder="name"
                required
              />
            </div> */}
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                ref={passwordRef}
                id="password"
                type="password"
                placeholder="m@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
