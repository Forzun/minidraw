"use client";
import CreateCanvas from "@/components/CreateCanvas";
import CanvasCard from "@/components/canvasCard";
import UseAuth from "@/hook/useAuth";
import { LogOut, SquarePlus } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function CanvasLogPage() {
  const { user, room } = UseAuth();
  const [create, setCreate] = useState(true);

  // if(!user || !room){
  //   return <div>Loading...</div>
  // }

  return (
    <div className="flex min-h-screen h-full w-full relative flex-col">
      <AddCanvasPopup create={create}  setCreate={setCreate} />
      <div className="md:py-8 py-5 px-5">
        <div className="flex w-full min h-[8vh] items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">
            Your Draw&apos;s
          </h1>
          <div className="flex gap-6 px-4">
            <button onClick={() => setCreate((c) => !c)}>
              <SquarePlus className="hover:text-yellow-500" />
            </button>
            <LogOut
            className="hover:text-yellow-500"
              onClick={() => {
                localStorage.removeItem("token");
                redirect("/");
              }}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-1 px-3 h-[67vh] w-full ">
          {room.map((value, index: number) => {
            return <CanvasCard key={index} user={user} room={value} />;
          })}
        </div>
      </div>
    </div>
  );
}

function AddCanvasPopup({ create , setCreate }: { create: boolean; setCreate: (open: boolean) => void }) {
  return (
    <>
      <CreateCanvas create={create} setCreate={setCreate} />
    </>
  );
}
