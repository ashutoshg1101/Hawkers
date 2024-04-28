import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
const markerIconUser = new L.Icon({
    iconUrl: require("../images/Location 2.png"), // Location dal na he
    iconSize: [35,45],
    iconAnchor: [17, 46],
    popupAnchor: [0,-46],
  });
const MapWithMarker = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );
  }, []); // Empty dependency array to run once on mount

  const HandleMarkerDrag = () => {
    const map = useMapEvents({
      dragend: (e) => {
        const marker = e.target;
        setPosition(marker.getLatLng());
        console.log(position[0]);
      },
    });
    return null;
  };

  return (
    <div >
      {position && <MapContainer
        center={position || [51.505, -0.09]} // Default center if user location not available
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "500px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {position && (
          <>
            <Marker
              icon={markerIconUser}
              draggable={true}
              position={position}
              eventHandlers={{
                dragend: (e) => {
                  setPosition(e.target.getLatLng());
                },
              }}
            //   onDragEnd={(e) => setPosition([e.target._latlng.lat, e.target._latlng.lng])}
            >
              <HandleMarkerDrag />
            </Marker>
          </>
        )}
      </MapContainer>}
      {position && (
        <div>
          Latitude: {position[0]}, Longitude: {position[1]}
        </div>
      )}
    </div>
  );
};

export default MapWithMarker;
