import React, { useState, useEffect } from "react";
import { Map, Marker, GoogleApiWrapper, useEff } from "google-maps-react";
import Formulario from "./Formulario";
import "../styles/mapa.css"

const Mapa = (props) => {
    console.log(props);
  const [markerPosition, setMarkerPosition] = useState({
    lat: -6.888463202449027,
    lng: -38.558930105104125,
  });
  const [localizacao, setLocalizacao] = useState(`${markerPosition.lat}, ${markerPosition.lng}`);
  console.log(localizacao, markerPosition);

  

  const onMapClick = (mapProps, map, clickEvent) => {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    const novaLocalizacao = `${lat}, ${lng}`;

    setLocalizacao(novaLocalizacao);
    setMarkerPosition({
      lat,
      lng,
    });
  };

  useEffect(() => {
    const [lat, lng] = localizacao.split(", ").map(parseFloat);
    if (!isNaN(lat) && !isNaN(lng)) {
      setMarkerPosition({
        lat,
        lng,
      });
    }
  }, [localizacao]);

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
          <Formulario markerPosition={markerPosition} localizacao={localizacao} usuario={props.nomeUsuario} usuarioId={props.usuarioId}/>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: false,
})(Mapa);