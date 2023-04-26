import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/pontos")
      .then((response) => response.json())
      .then((data) => {
        const eventosFormatados = data.map((evento) => ({
          ...evento,
          localizacao: {
            latitude: evento.geometria.coordinates[1],
            longitude: evento.geometria.coordinates[0],
          },
        }));
        setEventos(eventosFormatados);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1 className="title is-1">Lista de Eventos</h1>
      <div className="mb-3">
        <Link to="/" className="button is-link is-light">
          Voltar
        </Link>
      </div>

      <div className="columns is-multiline">
        {eventos.map((evento) => (
          <div key={evento.id} className="column is-one-third">
            <div className="card">
              <div className="card-content">
                <h2 className="title is-4">{evento.nome}</h2>
                <p>{evento.descricao}</p>
                <p className="is-size-7" style={{ display: "flex" }}>
                  <strong style={{ marginRight: "5px" }}>Latitude:</strong>
                  <input
                    type="text"
                    value={evento.localizacao.latitude}
                    className="input is-static is-size-7"
                    disabled
                    style={{ backgroundColor: "lightgray" }}
                  />
                  <strong style={{ marginLeft: "10px", marginRight: "5px" }}>
                    Longitude:
                  </strong>
                  <input
                    type="text"
                    value={evento.localizacao.longitude}
                    className="input is-static is-size-7"
                    disabled
                    style={{ backgroundColor: "lightgray" }}
                  />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eventos;
