import React from "react";

const Formulario = ({ markerPosition }) => {
  const salvar = () => {
    const obj = {
      nome: document.getElementById("nome").value,
      lat: markerPosition.lat,
      lng: markerPosition.lng,
    };

    fetch("http://localhost:3000/pontos", {
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
      style={{ width: "50%", height: "100%", justifyContent: "center" }}
    >
      <h1>Inserir Evento</h1>
      <form action="/eventos" method="POST">
        <label htmlFor="nome">Nome do Evento:</label>
        <input type="text" id="nome" name="nome" />
        <br />
        <br />
        <label htmlFor="descricao">Descrição do Evento:</label>
        <textarea id="descricao" name="descricao"></textarea>
        <br />
        <br />
        <label htmlFor="localizacao">Localização do Evento:</label>
        <input type="text" id="localizacao" name="localizacao" />
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