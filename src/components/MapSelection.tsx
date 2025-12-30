'use client';

import React, { useRef, useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

// Styling for the map container
const mapStyle = {
  height: '400px',
  width: '100%',
};

const MapComponent = ({ onPositionChange, initialLat, initialLng }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [markerPosition, setMarkerPosition] = useState({
    lat: initialLat && Number.isFinite(Number(initialLat)) ? Number(initialLat) : 28.0289837,
    lng: initialLng && Number.isFinite(Number(initialLng)) ? Number(initialLng) : 1.6666663,
  });

  const [zoom, setZoom] = useState(initialLat && initialLng ? 15 : 10);

  // Update marker position when initial values change
  useEffect(() => {
    if (initialLat && initialLng && Number.isFinite(Number(initialLat)) && Number.isFinite(Number(initialLng))) {
      setMarkerPosition({
        lat: Number(initialLat),
        lng: Number(initialLng),
      });
      setZoom(15);
    }
  }, [initialLat, initialLng]);

  // Autocomplete logic (NO loader here)
  useEffect(() => {
    if (!inputRef.current || !window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        setMarkerPosition({ lat, lng });
        setZoom(15);
        onPositionChange(lat, lng);
      }
    });
  }, [onPositionChange]);

  // Marker drag handler
  const handleMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setMarkerPosition({ lat, lng });
    setZoom(15);
    onPositionChange(lat, lng);
  };

  return (
    <div style={{ zIndex: 20 }}>
      <input
        ref={inputRef}
        placeholder="Enter location"
        style={{
          padding: '10px',
          width: '300px',
          borderRadius: '5px',
          marginBottom: '20px',
          border: '1px solid #ccc',
        }}
      />

      <GoogleMap
        mapContainerStyle={mapStyle}
        center={markerPosition}
        zoom={zoom}
      >
        <Marker
          position={markerPosition}
          draggable
          onDragEnd={handleMarkerDragEnd}
        />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
