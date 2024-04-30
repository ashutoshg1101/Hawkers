import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, TileLayer, useMap , Popup } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

const markerIconUser = new L.Icon({
  iconUrl: require("../images/Location 2.png"), // Location dal na he
  iconSize: [35,45],
  iconAnchor: [17, 46],
  popupAnchor: [0,-46],
});
const markerIconHawker = new L.Icon({
  iconUrl: require("../images/Location 3.png"), // Location dal na he
  iconSize: [35,45],
  iconAnchor: [17, 46],
  popupAnchor: [0,-46],
});

function RoutingMachine({ map, source, destination }) {
  const routingControl = L.Routing.control({
    waypoints: [
      L.latLng(source[0], source[1]),
      L.latLng(destination[0], destination[1])
    ],
    routeWhileDragging: true,
    show: true // Show the route line
  }).addTo(map);

  return null;
}

function MapComponent({ center, destination }) {
  const map = useMap();

  return (
    <div>
      <Marker icon={markerIconUser} position={center}><Popup>User Location</Popup></Marker>
      <Marker icon={markerIconHawker} position={destination}><Popup>Hawker Location</Popup></Marker>
      <RoutingMachine map={map} source={center} destination={destination} />
    </div>
  );
}

function App() {

  const [userLocation, setUserLocation] = useState(null);
  const [destination , setDestination] = useState(null); // Specify the destination coordinates

  useEffect(() => {
    // Get user's current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        error => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lat = params.get('lat');
    const lng = params.get('lng');
    setDestination([lat,lng]);
    console.log('Latitude:', lat);
    console.log('Longitude:', lng);
  }, [location.search]);


  return (
    <div>
      {userLocation ? (
        <MapContainer
          center={userLocation}
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapComponent center={userLocation} destination={destination} />
        </MapContainer>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
