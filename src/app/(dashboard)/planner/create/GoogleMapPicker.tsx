"use client";

import React, { useRef, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const libraries: ("places")[] = ["places"];

export default function GoogleMapPicker({
  onSelect,
  defaultCenter = { lat: 24.8607, lng: 67.0011 },
}) {
  const [marker, setMarker] = useState<any>(null);
  const mapRef = useRef<any>(null);
  const searchBoxRef = useRef<any>(null);

  // LOAD GOOGLE LIBRARIES
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  if (!isLoaded) return <p>Loading Map…</p>;

  // ON SEARCH SELECTED
  const handlePlaceChanged = () => {
    const places = searchBoxRef.current?.getPlaces();

    if (!places || places.length === 0) return;

    const place = places[0];
    const loc = place.geometry?.location;

    if (!loc) return;

    const lat = loc.lat();
    const lng = loc.lng();

    setMarker({ lat, lng });
    onSelect(lat, lng);

    mapRef.current?.panTo({ lat, lng });
    mapRef.current?.setZoom(15);
  };

  return (
    <div>
      {/* SEARCH INPUT — MUST BE OUTSIDE MAP */}
      <StandaloneSearchBox
        onLoad={(ref) => {
          console.log("🔵 SearchBox Loaded:", ref);
          searchBoxRef.current = ref;
        }}
        onPlacesChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Search location..."
          style={{
            width: "100%",
            height: "45px",
            padding: "0 12px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        />
      </StandaloneSearchBox>

      {/* GOOGLE MAP */}
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "420px" }}
        center={marker || defaultCenter}
        zoom={12}
        onLoad={(map) => (mapRef.current = map)}
        onClick={(e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          setMarker({ lat, lng });
          onSelect(lat, lng);
        }}
      >
        {marker && <MarkerF position={marker} />}
      </GoogleMap>
    </div>
  );
}
