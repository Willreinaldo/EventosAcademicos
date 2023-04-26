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
                <div className="field is-size-7">
                  <label htmlFor="localizacao" className="label">
                    Localização do Evento:
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      id="localizacao"
                      name="localizacao"
                      value={JSON.stringify(evento.localizacao)
                        .replace(/[{}"]/g, '') // remove os caracteres {, }, "
                        .replace(/-/g, '')     // remove o caractere -
                        .replace(/,/g, ', ')    // adiciona um espaço após a vírgula
                      }
                      className="input is-size-7"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eventos;
