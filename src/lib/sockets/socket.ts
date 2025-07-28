"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Socket_BASE_URL } from "@/types/apiConstants"

let socketInstance: Socket | null = null; // Global reference to reuse the same socket

const useSocket = (token: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (token && !socketInstance) {
      console.log("Creating new socket connection...");

      socketInstance = io(Socket_BASE_URL, {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      socketInstance.on("connect", () => {
        console.log("Socket connected:", socketInstance?.id);
      });

      socketInstance.on("disconnect", () => {
        socketInstance = null; // Reset socketInstance on disconnect
      });

      setSocket(socketInstance);
    } else if (socketInstance) {
      setSocket(socketInstance);
    }

    return () => {
      // Optional cleanup if needed
    };
  }, [token]);

  return socket;
};

export default useSocket;
