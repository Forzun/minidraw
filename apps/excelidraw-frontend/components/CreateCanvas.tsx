"use client";
import { ArrowLeft, PanelBottomClose } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRef } from "react";
import axios from "axios";
import { HTTP_BACKEND } from "@/config";

export default function CreateCanvas({
  create,
  setCreate,
}: {
  create: boolean;
  setCreate: (open: boolean) => void;
}) {
  const room = useRef<HTMLInputElement>(null);
  console.log(create);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const roomName = room.current?.value;
    const token = localStorage.getItem("token");

    if (!roomName) {
      console.log("not reveived");
      return;
    }

    try {
      const response = await axios.post(
        `${HTTP_BACKEND}/room`,
        {
          name: roomName.toString(),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response) {
        console.log(response);
        setCreate(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={`${create == true ? "hidden" : ""} fixed flex items-center justify-center min-h-screen h-full bg-neutral-900/10 w-full backdrop-blur-sm`}
    >
      <Button
        onClick={() => {
          setCreate(!create);
        }}
        type="submit"
        className="absolute top-2 left-2 hover:text-yellow-500"
      >
        <ArrowLeft />
        Crate
      </Button>
      <form onClick={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <PanelBottomClose size={55} />
              </div>
              <span className="sr-only">Acme Inc</span>
            </a>
            <h1 className="text-xl font-bold">Crate Your Draw</h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-1">
              <Input
                ref={room}
                id="text"
                type="text"
                placeholder="Enter Your Name.."
                required
              />
            </div>
            <Button type="submit" className="w-full hover:text-yellow-500">
              Crate
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
