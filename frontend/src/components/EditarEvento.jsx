import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bulma/css/bulma.css";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import FormEdit from "./FormEdit";

const EditarEvento = (props) => {

  const [markerPosition, setMarkerPosition] = useState({
    lat: -6.888463202449027,
    lng: -38.558930105104125,
  });
  const [localizacao, setLocalizacao] = useState(`${markerPosition.lat}, ${markerPosition.lng}`);

  
  const onMapClick = (mapProps, map, clickEvent) => {
    setLocalizacao(`${clickEvent.latLng.lat()}, ${clickEvent.latLng.lng()}`);
    setMarkerPosition(clickEvent.latLng);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <Map
          google={props.google}
          initialCenter={{
            lat: -6.888463202449027,
            lng: -38.558930105104125,
          }}
          zoom={14}
          onClick={onMapClick}

        >
          <Marker
            position={markerPosition}
            draggable={true}
            onDragend={(t, map, coord) =>
              setMarkerPosition({
                lat: coord.latLng.lat(),
                lng: coord.latLng.lng(),
              })}
          />
        </Map>
      </div>
      <div className="formulario-container">
          <FormEdit markerPosition={markerPosition} localizacao={localizacao}/>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: false,
})(EditarEvento);


