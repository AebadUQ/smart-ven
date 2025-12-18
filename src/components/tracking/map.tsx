// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import {
//   GoogleMap,
//   MarkerF,
//   PolylineF,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import { Box } from "@mui/material";
// import { connectSocket } from "@/socket/socket";

// const containerStyle = {
//   width: "100%",
//   height: "100%",
// };

// export function Map({ selectedLocations = [], currentVehicle, status }: any) {
//   const tripId = currentVehicle?.tripId;

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
//   });

//   const [livePath, setLivePath] = useState(selectedLocations);
//   const socketRef = useRef<any>(null);

//   /** Sync locations ONLY when prop changes */
//   useEffect(() => {
//     setLivePath(selectedLocations);
//   }, [selectedLocations]);
// console.log("ppppppppppppppppppppppppppp")
//   /** SOCKET LISTENER */
//   useEffect(() => {
//     if (status !== "ongoing") return;
//     if (!tripId) return;

//     const token = localStorage.getItem("token");
//     if (!token) return;

//     // avoid double connection
//     if (!socketRef.current) {
//       socketRef.current = connectSocket(token);
//     }

//     const socket = socketRef.current;

//     socket.emit("joinTrip", { tripId });

//     const handleLiveUpdate = (loc: any) => {
//       setLivePath((prev) => [
//         ...prev,
//         {
//           lat: loc.location.lat,
//           long: loc.location.long,
//           userId: loc.userId,
//           at: loc.at,
//         },
//       ]);
//     };

//     socket.on("locationUpdated", handleLiveUpdate);

//     return () => {
//       console.warn("🧹 Cleaning socket listeners...");
//       socket.off("locationUpdated", handleLiveUpdate);
//       socket.disconnect();
//       socketRef.current = null;
//     };
//   }, [tripId, status]);

//   // Convert to GM path
//   const path = livePath.map((loc: any) => ({
//     lat: loc.lat,
//     lng: loc.long,
//   }));

//   const center = path[0] || { lat: 24.8607, lng: 67.0011 };

//   if (!isLoaded) return <div style={{ height: "100%" }}>Loading…</div>;

//   return (
//     <Box sx={{ width: "100%", height: "100%" }}>
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={15}
//         options={{
//           streetViewControl: false,
//           mapTypeControl: false,
//           fullscreenControl: false,
//         }}
//       >
//         {path.length > 1 && (
//           <PolylineF
//             path={path}
//             options={{
//               strokeColor: "#1FA959",
//               strokeOpacity: 1,
//               strokeWeight: 4,
//             }}
//           />
//         )}

//         {path[0] && (
//           <MarkerF
//             position={path[0]}
//             label="A"
//             icon={{
//               url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
//             }}
//           />
//         )}

//         {path.map((p: any, idx: number) =>
//           idx === 0 ? null : (
//             <MarkerF
//               key={idx}
//               position={p}
//               icon={{
//                 url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
//               }}
//             />
//           )
//         )}

//         {path[path.length - 1] && (
//           <MarkerF
//             position={path[path.length - 1]}
//             icon={{
//               url: "/assets/van-marker.svg",
//               scaledSize: new google.maps.Size(40, 40),
//             }}
//           />
//         )}
//       </GoogleMap>
//     </Box>
//   );
// }
// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import {
//   GoogleMap,
//   MarkerF,
//   PolylineF,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import { Box } from "@mui/material";
// import { connectSocket } from "@/socket/socket";

// const containerStyle = {
//   width: "100%",
//   height: "100%",
// };

// export function Map({ selectedLocations = [], currentVehicle, status }: any) {
//   const tripId = currentVehicle?.tripId;

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
//   });

//   const [livePath, setLivePath] = useState(selectedLocations);
//   const socketRef = useRef<any>(null);

//   /** Sync locations ONLY when prop changes */
//   // useEffect(() => {
//   //   setLivePath(selectedLocations);
//   // }, [selectedLocations]);
//     const prevSelectedLocationsRef = useRef<any>(selectedLocations);

// useEffect(() => {
//     // Compare current selectedLocations with previous
//     if (JSON.stringify(selectedLocations) !== JSON.stringify(prevSelectedLocationsRef.current)) {
//       setLivePath(selectedLocations);
//       prevSelectedLocationsRef.current = selectedLocations; // Update the reference to the new value
//     }
//   }, [selectedLocations]); 
//   /** SOCKET LISTENER */
//   useEffect(() => {
//     if (status !== "ongoing" || !tripId) return;

//     const token = localStorage.getItem("token");
//     if (!token) return;

//     // avoid double connection
//     if (!socketRef.current) {
//       socketRef.current = connectSocket(token);
//     }

//     const socket = socketRef.current;

//     socket.emit("joinTrip", { tripId });

//     const handleLiveUpdate = (loc: any) => {
//       setLivePath((prev) => [
//         ...prev,
//         {
//           lat: loc.location.lat,
//           long: loc.location.long,
//           userId: loc.userId,
//           at: loc.at,
//         },
//       ]);
//     };

//     socket.on("locationUpdated", handleLiveUpdate);

//     // Cleanup on component unmount or when tripId or status changes
//     return () => {
//       if (socket) {
//         console.warn("🧹 Cleaning socket listeners...");
//         socket.off("locationUpdated", handleLiveUpdate);
//         socket.disconnect();
//         socketRef.current = null;
//       }
//     };
//   }, [tripId, status]); // Only run the effect when tripId or status changes

//   // Convert to GM path
//   const path = livePath.map((loc: any) => ({
//     lat: loc.lat,
//     lng: loc.long,
//   }));

//   const center = path[0] || { lat: 24.8607, lng: 67.0011 };

//   if (!isLoaded) return <div style={{ height: "100%" }}>Loading…</div>;

//   return (
//     <Box sx={{ width: "100%", height: "100%" }}>
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={15}
//         options={{
//           streetViewControl: false,
//           mapTypeControl: false,
//           fullscreenControl: false,
//         }}
//       >
//         {path.length > 1 && (
//           <PolylineF
//             path={path}
//             options={{
//               strokeColor: "#1FA959",
//               strokeOpacity: 1,
//               strokeWeight: 4,
//             }}
//           />
//         )}

//         {path[0] && (
//           <MarkerF
//             position={path[0]}
//             label="A"
//             icon={{
//               url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
//             }}
//           />
//         )}

//         {path.map((p: any, idx: number) =>
//           idx === 0 ? null : (
//             <MarkerF
//               key={idx}
//               position={p}
//               icon={{
//                 url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
//               }}
//             />
//           )
//         )}

//         {path[path.length - 1] && (
//           <MarkerF
//             position={path[path.length - 1]}
//             icon={{
//               url: "/assets/van-marker.svg",
//               scaledSize: new google.maps.Size(40, 40),
//             }}
//           />
//         )}
//       </GoogleMap>
//     </Box>
//   );
// }
"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  MarkerF,
  PolylineF,
} from "@react-google-maps/api";
import { Box } from "@mui/material";
import { connectSocket } from "@/socket/socket";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export function Map({ selectedLocations = [], currentVehicle, status }: any) {
  const tripId = currentVehicle?.tripId;

  const [livePath, setLivePath] = useState(selectedLocations);
  const socketRef = useRef<any>(null);
  const prevSelectedLocationsRef = useRef<any>(selectedLocations);

  /** Sync locations ONLY when prop changes */
  useEffect(() => {
    if (
      JSON.stringify(selectedLocations) !==
      JSON.stringify(prevSelectedLocationsRef.current)
    ) {
      setLivePath(selectedLocations);
      prevSelectedLocationsRef.current = selectedLocations;
    }
  }, [selectedLocations]);

  /** SOCKET LISTENER */
  useEffect(() => {
    if (status !== "ongoing" || !tripId) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    if (!socketRef.current) {
      socketRef.current = connectSocket(token);
    }

    const socket = socketRef.current;

    socket.emit("joinTrip", { tripId });

    const handleLiveUpdate = (loc: any) => {
      setLivePath((prev) => [
        ...prev,
        {
          lat: loc.location.lat,
          long: loc.location.long,
          userId: loc.userId,
          at: loc.at,
        },
      ]);
    };

    socket.on("locationUpdated", handleLiveUpdate);

    return () => {
      if (socket) {
        socket.off("locationUpdated", handleLiveUpdate);
        socket.disconnect();
        socketRef.current = null;
      }
    };
  }, [tripId, status]);

  // Convert to GM path
  const path = livePath.map((loc: any) => ({
    lat: loc.lat,
    lng: loc.long,
  }));

  const center = path[0] || { lat: 24.8607, lng: 67.0011 };

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

        {path[0] && (
          <MarkerF
            position={path[0]}
            label="A"
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            }}
          />
        )}

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
