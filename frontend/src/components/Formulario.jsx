import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importe o useHistory do React Router
import "bulma/css/bulma.css"; // Importe o arquivo CSS do Bulma

const Formulario = ({ markerPosition, localizacao }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate(); // Inicialize o useHistory

  const handleVerEventos = () => {
    navigate("/eventos"); // Chame navigate com a rota "/eventos"
  };

  const salvar = async () => {
    if (!nome) {
      alert("Nome não pode ser vazio.");
      return;
    }
    console.log(localizacao);
    const obj = {
      nome: nome,
      lat: markerPosition.lat,
      lng: markerPosition.lng,
      descricao: descricao,
      localizacao: localizacao,
    };

    fetch("http://localhost:4000/pontos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => {
        alert("Salvo com sucesso");
      })
      .catch((error) => alert("Falha ao salvar!"));
  };

  return (
    <div
      id="form"
      className="column is-half"
      style={{ justifyContent: "center", margin: "0 auto", marginTop: "1em" }}
    >
      <h1 className="title is-3">Inserir Evento</h1>
      <form action="/eventos" method="POST">
        <div className="field">
          <label htmlFor="nome" className="label">
            Nome do Evento:
          </label>
          <div className="control">
            <input
              type="text"
              id="nome"
              name="nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              className="input"
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="descricao" className="label">
            Descrição do Evento:
          </label>
          <div className="control">
            <textarea
              id="descricao"
              name="descricao"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              className="textarea"
            ></textarea>
          </div>
        </div>

        <div className="field">
          <label htmlFor="localizacao" className="label">
            Localização do Evento:
          </label>
          <div className="control">
            <input
              type="text"
              id="localizacao"
              name="localizacao"
              value={localizacao}
              className="input "
              disabled
            />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button type="button" onClick={salvar} className="button is-link">
              Salvar
            </button>
          </div>
          <div className="control">
            <button
              type="button"
              onClick={handleVerEventos}
              className="button is-text"
            >
              Ver eventos
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Formulario;






