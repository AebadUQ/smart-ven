import { io } from "socket.io-client";

export const connectSocket = (token: string) => {
  const socket = io(process.env.NEXT_PUBLIC_BASE_URL as string, {
    transports: ["websocket"],
    query: {
      token: `Bearer ${token}`,   // 👈 backend will receive this
    },
  });

  console.log("Token sent via query:", token);

  socket.on("connect", () => {
    console.log("Connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.log("Connection error:", err.message);
  });

  return socket;
};
