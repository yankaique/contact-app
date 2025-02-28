'use client';
import { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { MapProvider } from './map-provider';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: -23.55052,
  lng: -46.633308,
};

type GoogleMapsType = { lat: number; lng: number };

export function GoogleMaps({ lat, lng }: GoogleMapsType) {
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  return (
    <MapProvider>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={15}
        onLoad={() => setMarkerPosition({ lat, lng })}
        options={{
          zoom: 20,
        }}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </MapProvider>
  );
}
