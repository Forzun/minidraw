"use client"

export default function Authpage({isSignin} : { 
    isSignin: boolean;
}){ 

    

    return ( 
        <div className="w-full h-screen flex items-center justify-center">
            <input type="text" className="py-2 px-3" placeholder="john@gmail.com" />
            <input type="password" className="py-2 px-3" placeholder="password" />

            <button onClick={() => { 
                
            }} className="px-3 py-2 border border-neutral-700 bg-neutral-100 text-neutral-900 rounded-md">{isSignin ? "SignUp" : "Login"}</button>
        </div>
    )
}

