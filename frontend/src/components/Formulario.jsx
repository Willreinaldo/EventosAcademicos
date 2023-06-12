import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditarEvento from "./EditarEvento";
import "bulma/css/bulma.css";

const Formulario = ({ markerPosition, localizacao }) => {
  const today = new Date();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState(today);
  const [dataTermino, setDataTermino] = useState(today);
  const navigate = useNavigate();

  const handleVerEventos = () => {
    navigate("/eventos");
  };

  const salvar = async () => {
    if (!nome) {
      alert("Nome não pode ser vazio.");
      return;
    }
    const obj = {
      nome: nome,
      descricao: descricao,
      dataInicio: dataInicio,
      dataTermino: dataTermino,
      localizacao: localizacao,
      geometria: {
        type: 'Point',
        coordinates: [markerPosition.lng, markerPosition.lat],
      },
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
              className="textarea is-small"
            ></textarea>
          </div>
        </div>

        <div className="field  is-size-7">
          <label htmlFor="localizacao" className="label">
            Localização do Evento:
          </label>
          <div className="control ">
            <input
              type="text"
              id="localizacao"
              name="localizacao"
              value={localizacao}
              className="input is-size-7"
              disabled
            />
          </div>
        </div>

        <div> 
        <label htmlFor="dataInicio" className="label">
          Data de Início:
        </label>
        <div className="control">
          <input
            type="date"
            id="dataInicio"
            name="dataInicio"
            value={dataInicio}
            onChange={(event) => setDataInicio(event.target.value)}
            className="input"
            required
          />
        </div>

        <label htmlFor="dataTermino" className="label">
          Data de Término:
        </label>
        <div className="control">
          <input
            type="date"
            id="dataTermino"
            name="dataTermino"
            value={dataTermino}
            onChange={(event) => setDataTermino(event.target.value)}
            className="input"
            required
          />
        </div>
        </div>
      <br></br>

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
