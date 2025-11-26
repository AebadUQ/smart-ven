import React, { useMemo } from "react";
import {
  GoogleMap,
  MarkerF,
  PolylineF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Box } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export function Map({ selectedLocations = [],currentVehicle }: any) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });

  // Convert list → polyline points
  const path = selectedLocations.map((loc: any) => ({
    lat: loc.lat,
    lng: loc.long,
  }));

  // Center = first location
  const center = path[0] || { lat: 24.8607, lng: 67.0011 };

  if (!isLoaded) return <div style={{ height: "100%" }}>Loading…</div>;
console.log("currentVehicle",currentVehicle)
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
        {/* 🟦 Polyline connecting all points */}
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

        {/* 🟢 First point marker */}
        {path[0] && (
          <MarkerF
            position={path[0]}
            label="A"
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            }}
          />
        )}

        {/* 🟡 All other points */}
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

        {/* 🚐 Last point: VAN icon */}
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
