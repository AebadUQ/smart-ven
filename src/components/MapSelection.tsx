'use client';

import React, { useRef, useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// Styling for the map container
const mapStyle = {
  height: '400px',
  width: '100%',
};

const MapComponent = ({ onPositionChange }) => {
  const inputRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState({
    lat: 28.0289837,
    lng: 1.6666663,
  });

  const [zoom, setZoom] = useState(10);  // State for controlling zoom level

  // Loading Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Replace with your API key
    libraries: ['places'], // Ensure the places library is loaded for Autocomplete
  });

  // Autocomplete input and marker position update logic
  useEffect(() => {
    if (isLoaded && inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);

      // Listen for when the user selects a place from the autocomplete
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setMarkerPosition({ lat, lng });
          setZoom(15); // Zoom in when a location is selected
          onPositionChange(lat, lng); // Update the parent with the new position
        }
      });
    }
  }, [isLoaded, onPositionChange]);

  // Marker drag-end handler
  const handleMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });
    setZoom(15); // Zoom in after the marker is dragged
    onPositionChange(lat, lng); // Update the parent with the new position
  };

  return (
    <div style={{ zIndex: 20 }}>
      <div>
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
      </div>

      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={mapStyle}
          center={markerPosition}
          zoom={zoom}  // Dynamically update zoom
        >
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={handleMarkerDragEnd} // Handle drag end to update the position
          />
        </GoogleMap>
      ) : (
        <p>Loading map...</p> // Show a loading message while the map is loading
      )}
    </div>
  );
};

export default MapComponent;
