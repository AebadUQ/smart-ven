// GoogleMapsProvider.tsx
'use client';

import { useJsApiLoader } from '@react-google-maps/api';

const libraries: ('places')[] = ['places'];

export default function GoogleMapsProvider({ children }:any) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script', // SAME ID everywhere
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  if (!isLoaded) return <p>Loading map...</p>;

  return children;
}
