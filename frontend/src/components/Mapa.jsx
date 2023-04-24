import React, { useState } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Formulario from "./Formulario";

const MapContainer = (props) => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: -6.888463202449027,
    lng: -38.558930105104125,
  });

  const onMarkerDragEnd = (coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setMarkerPosition({ lat, lng });
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <Map
          style={{ width: "50%", height: "100%" }}
          google={props.google}
          initialCenter={{
            lat: -6.888463202449027,
            lng: -38.558930105104125,
          }}
          zoom={14}
          onClick={(t, map, coord) => {
            setMarkerPosition(coord);
          }}
        >
          <Marker
            position={markerPosition}
            draggable={true}
            onDragend={(t, map, coord) => onMarkerDragEnd(coord)}
          />
        </Map>
      </div>
      <div style={{ flex: 1 }}>
        <Formulario markerPosition={markerPosition} />
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: false,
})(MapContainer);