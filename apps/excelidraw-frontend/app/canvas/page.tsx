"use client";
import CanvasCard from "@/components/canvasCard";
import { getCanvas } from "@/hook/getCanvas";
import { LogOut, SquarePlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function CanvasLogPage() {
  const [room , setRoom] = useState(null);

  useEffect(() => { 
    const fetchRoom = async () => { 
        const roomData = await getCanvas("cohort-chat-3"); 
        setRoom(roomData);
    }
    fetchRoom();
  }, [])

  return (
    <div className="flex min-h-screen h-full w-full relative flex-col md:py-8 py-5 px-5">
      <div>
        <div className="flex w-full min h-[8vh] items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">
            Your Draw&apos;s
          </h1>
          <div className="flex gap-6 px-4">
            <SquarePlus />
            <LogOut />
          </div>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 px-3 h-[67vh] w-full ">
          <CanvasCard room={room} />
        </div>
      </div>
    </div>
  );
}
