import { FolderPen, GlobeLock , Timer, User } from "lucide-react";
import { Button } from "./ui/button";

export default function CanvasCard() {
  return (
    <div className="w-70 mt-3 h-fit rounded-xl border-1 p-4 bg-neutral-900 border-neutral-700/30 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"> 
      <div className="w-16 h-16 rounded-full border-neutral-600 border-2 border-dashed object-cover"></div>
      <div className="mt-4 flex flex-col gap-2 text-neutral-200 text-sm">
        <span className="flex gap-1 items-center ">
          {" "}
          <User className="w-4" /> <p>Harkirat</p>{" "}
        </span>
        <span className="flex gap-1 items-center ">
          {" "}
          <GlobeLock className="w-4" /> <p>Private</p>{" "}
        </span>
        <span className="flex gap-1 items-center ">
          {" "}
          <FolderPen className="w-4" /> <p>Cohort-3.0</p>{" "}
        </span>
        <span className="flex gap-1 items-center ">
          {" "}
          <Timer className="w-4" /> <p>10/4/2025</p>{" "}
        </span>
      </div>
      <div className="relative mt-3 ">
        <Button className="w-full bg-yellow-700" variant={"secondary"}>
          MakeDraw
        </Button>
      </div>
    </div>
  );
}
