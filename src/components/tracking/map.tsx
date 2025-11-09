'use client';

import React, { useMemo, useState } from 'react';
import {
  GoogleMap,
  MarkerF,
  PolylineF,
  InfoWindowF,
  useJsApiLoader,
} from '@react-google-maps/api';

interface MapProps {
  vehicles: any[];                // trips array
  currentVehicleId?: string;      // optional: selected trip/van id
  onVehicleSelect?: (id: string) => void;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

// helper: given a trip/vehicle, get its last van point (trail end)
const getLastPoint = (v: any) => {
  const path: { lat: number; lng: number }[] = [];

  if (v.tripStart?.lat && v.tripStart?.long) {
    path.push({ lat: v.tripStart.lat, lng: v.tripStart.long });
  }

  if (Array.isArray(v.locations) && v.locations.length) {
    const sorted = [...v.locations].sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );
    sorted.forEach((loc) => {
      if (loc.lat && loc.long) path.push({ lat: loc.lat, lng: loc.long });
    });
  }

  if (v.tripEnd?.lat && v.tripEnd?.long) {
    path.push({ lat: v.tripEnd.lat, lng: v.tripEnd.long });
  }

  if (path.length) return path[path.length - 1];

  if (v.latitude && v.longitude) {
    return { lat: v.latitude, lng: v.longitude };
  }

  if (v.tripStart?.lat && v.tripStart?.long) {
    return { lat: v.tripStart.lat, lng: v.tripStart.long };
  }

  return null;
};

export function Map({ vehicles, currentVehicleId, onVehicleSelect }: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  });

  const [activeId, setActiveId] = useState<string | null>(null);

  const current =
    vehicles.find((v) => String(v.id || v._id) === currentVehicleId) ||
    vehicles[0];

  // center = current van ka last point; zoom high (16)
  const center = useMemo(() => {
    if (!current) return { lat: 24.8607, lng: 67.0011 };
    const last = getLastPoint(current);
    return last || { lat: 24.8607, lng: 67.0011 };
  }, [current]);

  // simple van icon (optional)
  const vanIcon = useMemo(() => {
    if (typeof window === 'undefined' || !(window as any).google) return undefined;
    return {
      url: '/assets/van-marker.svg', // make sure file exists
      scaledSize: new window.google.maps.Size(32, 32),
      anchor: new window.google.maps.Point(16, 16),
    };
  }, [isLoaded]);

  if (!isLoaded) return <div style={{ height: '100%' }}>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}              // 👈 fully zoomed on current van
      mapTypeId="roadmap"
      options={{
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      {vehicles.map((v: any) => {
        const id = String(v.id || v._id);

        // build trail (same simple rule everywhere)
        const path: { lat: number; lng: number }[] = [];

        if (v.tripStart?.lat && v.tripStart?.long) {
          path.push({ lat: v.tripStart.lat, lng: v.tripStart.long });
        }

        if (Array.isArray(v.locations) && v.locations.length) {
          const sorted = [...v.locations].sort(
            (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
          );
          sorted.forEach((loc) => {
            if (loc.lat && loc.long) path.push({ lat: loc.lat, lng: loc.long });
          });
        }

        if (v.tripEnd?.lat && v.tripEnd?.long) {
          path.push({ lat: v.tripEnd.lat, lng: v.tripEnd.long });
        }

        const lastPoint = getLastPoint(v);
        if (!lastPoint) return null;

        return (
          <React.Fragment key={id}>
            {path.length > 1 && (
              <PolylineF
                path={path}
                options={{
                  strokeColor: '#1E90FF',
                  strokeOpacity: 0.9,
                  strokeWeight: 4,
                }}
              />
            )}

            <MarkerF
              position={lastPoint}
              icon={vanIcon}
              onClick={() => {
                onVehicleSelect?.(id);
                setActiveId(id);
              }}
            />

            {activeId === id && (
              <InfoWindowF
                position={lastPoint}
                onCloseClick={() => setActiveId(null)}
              >
                <div style={{ fontSize: 12 }}>
                  <div><strong>Driver:</strong> {v.driverName || 'Unknown'}</div>
                  <div><strong>Van:</strong> {v.carNumber || '-'}</div>
                  <div><strong>Status:</strong> {v.status || '-'}</div>
                </div>
              </InfoWindowF>
            )}
          </React.Fragment>
        );
      })}
    </GoogleMap>
  );
}
