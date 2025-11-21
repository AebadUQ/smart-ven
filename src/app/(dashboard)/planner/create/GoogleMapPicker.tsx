"use client";

import React, { useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const libraries: ("places")[] = ["places"];

export default function GoogleMapPicker({
  onSelect,
  defaultCenter = { lat: 24.8607, lng: 67.0011 }, // Karachi
}) {
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  if (!isLoaded) return <p>Loading map…</p>;

  const handlePlaceChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (!places || places.length === 0) return;

    const place = places[0];
    const location = place.geometry.location;

    const lat = location.lat();
    const lng = location.lng();

    setMarker({ lat, lng });
    onSelect(lat, lng);

    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  };

  return (
    <div>
      {/* <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Search location (Karachi)…"
          style={{
            width: "100%",
            height: "45px",
            padding: "0 14px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            marginBottom: "8px",
          }}
        />
      </StandaloneSearchBox> */}

      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "420px" }}
        center={defaultCenter}
        zoom={13}
        onLoad={(map) => (mapRef.current = map)}
        onClick={(e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          setMarker({ lat, lng });
          onSelect(lat, lng);
        }}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </div>
  );
}
