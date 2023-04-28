import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bulma/css/bulma.css";

const EditarEvento = () => {
  const { id } = useParams(); // Obtenha o ID do evento da URL
  console.log(id);
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Use um estado isLoading para controlar o carregamento do evento

  useEffect(() => {
    fetch(`http://localhost:4000/pontos/${id}`) // Faça uma solicitação para buscar as informações do evento com o ID fornecido na URL
      .then((response) => response.json())
      .then((data) => {
        setNome(data.nome);
        setDescricao(data.descricao);
        setLocalizacao(data.localizacao);
        setIsLoading(false); // Quando as informações do evento forem carregadas, defina isLoading como falso
      })
      .catch((error) => alert("Falha ao carregar as informações do evento!"));
  }, [id]);

  const handleSalvar = async () => {
    if (!nome) {
      alert("Nome não pode ser vazio.");
      return;
    }

    const obj = {
      nome: nome,
      descricao: descricao,
      localizacao: localizacao,
    };

    fetch(`http://localhost:4000/pontos/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => {
        alert("Evento atualizado com sucesso!");
        navigate("/eventos");  
      })
      .catch((error) => alert("Falha ao atualizar o evento!"));
  };

  const handleCancelar = () => {
    navigate("/eventos"); // Redireciona o usuário de volta para a página de eventos sem salvar as alterações
  };

  if (isLoading) {
    return <p>Carregando...</p>;  
  }

  return (
    <div className="container">
      <h1 className="title">Editar evento</h1>
      <div className="field">
        <label className="label">Nome</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Descrição</label>
        <div className="control">
          <textarea
            className="textarea"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Localização</label>
        <div className="control">
          <input
            className="input"
            type="text"
             onChange={(e) => setLocalizacao(e.target.value)}
             placeholder="Não é possivel editar sua localização"
             readOnly
          />
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" onClick={handleSalvar}>
            Salvar
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light" onClick={handleCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default EditarEvento;
