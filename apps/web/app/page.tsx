"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <input
        type="text"
        value={roomId}
        onChange={(e) => {
          setRoomId(e.target.value);
        }}
      ></input>

      <button
        onClick={() => {
          router.push(`room/${roomId}`);
        }}
      >
        Join Room
      </button>
    </div>
  );
}
