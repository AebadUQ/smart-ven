// "use client";

// import React, { useRef, useState, useCallback, useEffect } from "react";
// import {
//   GoogleMap,
//   MarkerF,
//   useJsApiLoader,
//   LatLngLiteral,
// } from "@react-google-maps/api";

// const libraries = ["places"] as const;

// interface GoogleMapPickerProps {
//   /** Callback when a location is selected (for marker setting) */
//   onSelect: (lat: number, lng: number) => void;
//   /** Callback to initiate navigation to the selected place */
//   onNavigate?: (destination: string, lat: number, lng: number) => void;
//   defaultCenter?: LatLngLiteral;
// }

// const initialCenter: LatLngLiteral = { lat: 24.8607, lng: 67.0011 };

// export default function GoogleMapPicker({
//   onSelect,
//   onNavigate,
//   defaultCenter = initialCenter,
// }: GoogleMapPickerProps) {
//   // --- HOOKS SECTION ---
//   const [marker, setMarker] = useState<LatLngLiteral | null>(null);
//   const mapRef = useRef<google.maps.Map | null>(null);

//   const searchContainerRef = useRef<HTMLDivElement | null>(null);
//   const autocompleteElementRef = useRef<google.maps.places.PlaceAutocompleteElement | null>(null);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
//     libraries,
//   });
//   // --- END OF HOOKS SECTION ---

//   // 🎯 Search Selection Handler (Moves Marker/Map and Triggers Navigation)
//   const handlePlaceSelection = useCallback(async (event: Event) => {
//     if (!mapRef.current) return;

//     const customEvent = event as CustomEvent<{ placePrediction: google.maps.places.PlacePrediction }>;

//     if (!customEvent.detail || !customEvent.detail.placePrediction) {
//       return;
//     }

//     const prediction = customEvent.detail.placePrediction;

//     try {
//       const place = prediction.toPlace();
//       await place.fetchFields({ fields: ["location", "displayName", "formattedAddress"] });

//       const loc = place.location;
//       const destinationName = place.displayName || place.formattedAddress || prediction.text;

//       if (!loc) return;

//       const newMarker: LatLngLiteral = { lat: loc.lat, lng: loc.lng };

//       setMarker(newMarker); // Update the marker
//       onSelect(newMarker.lat, newMarker.lng); // Pass to parent

//       // Pan the map to the new location
//       mapRef.current.panTo(newMarker); // Pan map to new marker
//       mapRef.current.setZoom(15); // Zoom in to the location

//       // Trigger navigation if provided
//       if (onNavigate) {
//         onNavigate(destinationName, newMarker.lat, newMarker.lng);
//       }
//     } catch (e) {
//       console.error("Error processing place details:", e);
//     }
//   }, [onSelect, onNavigate]);

//   // 🔑 Initializes and mounts the Place Autocomplete Element
//   useEffect(() => {
//     if (isLoaded && searchContainerRef.current && !autocompleteElementRef.current) {
//       const autocompleteElement = new google.maps.places.PlaceAutocompleteElement({});
//       autocompleteElement.addEventListener("gmp-select", handlePlaceSelection as EventListener);

//       searchContainerRef.current.appendChild(autocompleteElement);
//       autocompleteElementRef.current = autocompleteElement;

//       // Cleanup function
//       return () => {
//         if (autocompleteElementRef.current) {
//           autocompleteElementRef.current.removeEventListener("gmp-select", handlePlaceSelection as EventListener);
//           autocompleteElementRef.current.remove();
//           autocompleteElementRef.current = null;
//         }
//       };
//     }
//   }, [isLoaded, handlePlaceSelection]);

//   // 📍 Map Click Handler (Sets Marker - Prevents Modal Closure)
//   const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
//     e.stop();

//     const newMarker: LatLngLiteral = { lat: e.latLng!.lat(), lng: e.latLng!.lng() };

//     setMarker(newMarker); // Update the marker
//     onSelect(newMarker.lat, newMarker.lng); // Pass to parent
//   }, [onSelect]);

//   if (!isLoaded) return <p>Loading Map…</p>;

//   const mapCenter = marker || defaultCenter;

//   return (
//     <div style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "10px" }}>
//       {/* Search Container */}
//       <div
//         ref={searchContainerRef}
//         style={{ marginBottom: "10px", height: "45px" }}
//       />

//       <div
//         onClick={(e) => e.stopPropagation()}
//         onMouseDown={(e) => e.stopPropagation()}
//       >
//         <GoogleMap
//           mapContainerStyle={{ width: "100%", height: "420px", borderRadius: "8px" }}
//           center={mapCenter} // Map center is tied directly to marker state
//           zoom={marker ? 15 : 12}
//           onLoad={(map) => (mapRef.current = map)} // Set mapRef on map load
//           onClick={handleMapClick}
//         >
//           {/* Marker position is tied directly to marker state */}
//           {marker && <MarkerF position={marker} />}
//         </GoogleMap>
//       </div>
//     </div>
//   );
// }
import React from 'react'

const GoogleMapPicker = () => {
  return (
    <div>
      
    </div>
  )
}

export default GoogleMapPicker
