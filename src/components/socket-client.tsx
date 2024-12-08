"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

import type { ChangeEvent } from "react";
import type { Socket } from "socket.io-client";

let socket: undefined | Socket;

export default function SocketClient() {
  const [input, setInput] = useState("");
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", (msg) => {
      setInput(msg);
    });
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    if (socket !== undefined) {
      socket.emit("input-change", e.target.value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 space-y-4">
      <div className="w-full max-w-sm">
        <input
          placeholder="Type something"
          onChange={onChangeHandler}
          className="w-full px-3 py-1 text-gray-200 bg-gray-800 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="w-full max-w-sm">
        <code>{input || ""}</code>
      </div>
    </div>
  );
}
