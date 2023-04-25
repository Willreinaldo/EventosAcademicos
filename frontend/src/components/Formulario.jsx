import React, { useState, useEffect } from "react";

const Formulario = ({ markerPosition, localizacao }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const salvar = async () => {
    console.log(localizacao);
    const obj = {
      nome: nome,
      lat: markerPosition.lat,
      lng: markerPosition.lng,
      descricao: descricao,
      localizacao: localizacao
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
    style={{
      width: "50%",
      height: "100%",
      justifyContent: "center",
      position: "absolute",
      top: 0,
      left: 0
    }}
  >
      <h1>Inserir Evento</h1>
      <form action="/eventos" method="POST">
        <label htmlFor="nome">Nome do Evento:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
        <br />
        <br />
        <label htmlFor="descricao">Descrição do Evento:</label>
        <textarea
          id="descricao"
          name="descricao"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
        ></textarea>
        <br />
        <br />
        <label htmlFor="localizacao">Localização do Evento:</label>
        <input
          type="text"
          id="localizacao"
          name="localizacao"
          value={localizacao}
        />
        <br />
        <br />
        <button type="button" onClick={salvar}>
          Salvar
        </button>
      </form>
    </div>
  );
};

export default Formulario;