'use client'
import { connectSocket } from "@/socket/socket";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function Trip({ tripId = '692715b6500c5c8c7f426078' }) {
  const socketRef = useRef<any>(null);
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    // Connect socket
    socketRef.current = connectSocket(token);

    // Join trip room
    socketRef.current.emit("joinTrip", { tripId });

    // Confirmation
    socketRef.current.on("joinedTrip", (data) => {
      console.log("🎉 Joined Trip Room:", data);
    });

    // 🔥 Listen for live location updates
    socketRef.current.on("locationUpdated", (loc) => {
      console.log("📍 Live Location Received:", loc);
      // Example:
      // loc = { lat: 24.8607, lng: 67.0011, vanId: "...", timestamp: "..." }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [tripId]);

  return <div>Trip ID: {tripId}</div>;
}
