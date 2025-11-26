"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  MarkerF,
  PolylineF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Box } from "@mui/material";
import { connectSocket } from "@/socket/socket";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export function Map({ selectedLocations = [], currentVehicle, status }: any) {
  const tripId = currentVehicle?.tripId;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  const [livePath, setLivePath] = useState(selectedLocations);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    setLivePath(selectedLocations);
  }, [selectedLocations]);

  // SOCKET LISTENING
  useEffect(() => {
    if (status !== "ongoing") {
      console.log("⛔ Trip not ongoing — skipping socket");
      return;
    }

    if (!tripId) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    socketRef.current = connectSocket(token);

    socketRef.current.emit("joinTrip", { tripId });

    socketRef.current.on("joinedTrip", (data) => {
      console.log("🎉 Joined trip:", data);
    });

    socketRef.current.on("locationUpdated", (loc) => {
      console.log("📍 Live update received:", loc);

      setLivePath((prev) => [
        ...prev,
        {
          lat: loc.location.lat,  // ⭐ correct mapping
          long: loc.location.long,
          userId: loc.userId,
          at: loc.at,
        },
      ]);
    });

    // return () => {
    //   socketRef.current?.disconnect();
    // };
  }, [tripId, status]);
console.log("lllllllll",livePath)
  // Convert for Google Maps
  const path = livePath.map((loc: any) => ({
    lat: loc.lat,
    lng: loc.long,
  }));

  const center = path[0] || { lat: 24.8607, lng: 67.0011 };

  if (!isLoaded) return <div style={{ height: "100%" }}>Loading…</div>;

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {/* Route line */}
        {path.length > 1 && (
          <PolylineF
            path={path}
            options={{
              strokeColor: "#1FA959",
              strokeOpacity: 1,
              strokeWeight: 4,
            }}
          />
        )}

        {/* Start marker */}
        {path[0] && (
          <MarkerF
            position={path[0]}
            label="A"
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            }}
          />
        )}

        {/* Middle points */}
        {path.map((p: any, idx: number) =>
          idx === 0 ? null : (
            <MarkerF
              key={idx}
              position={p}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
              }}
            />
          )
        )}

        {/* Vehicle marker */}
        {path[path.length - 1] && (
          <MarkerF
            position={path[path.length - 1]}
            icon={{
              url: "/assets/van-marker.svg",
              scaledSize: new google.maps.Size(40, 40),
            }}
          />
        )}
      </GoogleMap>
    </Box>
  );
}
