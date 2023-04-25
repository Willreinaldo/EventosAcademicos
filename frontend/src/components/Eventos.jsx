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
      <h1>Lista de Eventos</h1>
      <Link to="/">
        <button>Voltar</button>
      </Link>
      <ul>
        {eventos.map((evento) => (
          <li key={evento.id}>
            <h2>{evento.nome}</h2>
            <p>{evento.descricao}</p>
            <p>Latitude: {evento.localizacao.latitude}, Longitude: {evento.localizacao.longitude}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Eventos;