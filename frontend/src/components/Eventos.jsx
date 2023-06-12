import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);

  const verNoMapa = (localizacao) => {
    const { latitude, longitude } = localizacao;
    const url = `https://www.google.com/maps/place/${longitude},${latitude}`;
    window.open(url, "_blank");
  };
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
  
  const handleDelete = (id) => {
    fetch(`http://localhost:4000/pontos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setEventos(eventos.filter((evento) => evento.id !== id));
      })
      .catch((error) => console.error(error));
  };
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
                <p>{evento.dataInicio}</p>
                <p>{evento.dataFinal}</p>
                <p> </p>
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
                    <div className="column is-narrow">
                      <button
                        className="button is-small"
                        onClick={() => verNoMapa(evento.localizacao)}
                      >
                        <span className="icon">
                          <i className="fas fa-map-marker-alt"></i>
                        </span>
                        Ver no mapa
                      </button>
                    </div>
                    <div className="column is-narrow">
                      <Link
                        className="button is-small"
                        to={`/eventos/${evento.id}`}
                      >
                        <span className="icon">
                          <i className="fas fa-edit"></i>
                        </span>
                        Editar
                      </Link>
                      <button
                        className="button is-small is-danger"
                        onClick={() => handleDelete(evento.id)}
                      >
                        <span className="icon">
                          <i className="fas fa-trash-alt"></i>
                        </span>
                        Deletar
                      </button>
                    </div>
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