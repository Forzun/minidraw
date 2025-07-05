    'use client'
    import { WS_URL } from "../app/config";
    import { useEffect, useState } from "react"

    export function useSocket(){ 
        const [loading , setLoading] = useState(true);
        const [socket , setSocket] = useState<WebSocket>();

        useEffect(() => { 
            const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYjNlZDZhMC00NWYxLTQwZTctOTNmNS02MjBlNjA4ODc4MzQiLCJpYXQiOjE3NTE2OTk1NTd9.5BTEbnps_EUlblx49dW5_tuN56G0yfrYyWnv_hwdcV0
`); 
            ws.onopen = () => { 
                setLoading(false)
                setSocket(ws);
            }
        }, [])

        return {
            loading,
            socket
        }
    }


