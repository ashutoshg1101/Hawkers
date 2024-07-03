import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const MapComponent = () => {
  return (
    <MapContainer center={[29.9476, 76.8227]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

// const App = () => {
//   return (
//     <div>
//       <h1>OpenStreetMap Integration</h1>
//       <MapComponent />
//     </div>
//   );
// };

export default MapComponent;
