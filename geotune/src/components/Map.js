import { React, useState } from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import MapDebugger from "./MapDebugger";
import 'leaflet/dist/leaflet.css';


function Map() {

  return (<div className='z-0 absolute left-0 top-0 h-screen w-screen'>

    <MapContainer center={[45.803, 15.977]} zoom={12.5} scrollWheelZoom={true} style={{ height: '100vh' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      <MapDebugger/>
      {/* {polygons.polygons.map((polygon, index) => (
        <Polygon key={index} pathOptions={{ color: 'purple' }} positions={polygon} />
      ))} */}
    </MapContainer>
  </div>

  );
}

export default Map;
