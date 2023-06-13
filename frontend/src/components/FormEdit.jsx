import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bulma/css/bulma.css";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

    const FormEdit = ({ markerPosition, localizacao }) => {
     const { id } = useParams(); // Obtenha o ID do evento da URL
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataTermino, setDataTermino] = useState("");
    const [isLoading, setIsLoading] = useState(true);  
  
    useEffect(() => {
      fetch(`http://localhost:4000/pontos/${id}`) 
        .then((response) => response.json())
        .then((data) => {
          setNome(data.nome);
          setDescricao(data.descricao);
          setDataTermino(data.dataTermino);
          setDataInicio(data.dataInicio);
          setIsLoading(false);  
        })
        .catch((error) => alert("Falha ao carregar as informações do evento!"));
    }, [id]);
  
    const handleSalvar = async () => {
      if (!nome) {
        alert("Nome não pode ser vazio.");
        return;
      }
      console.log("local: ",localizacao);
      const obj = {
        nome: nome,
        dataInicio: dataInicio,
        dataTermino: dataTermino,
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
              value={(localizacao)}
               readOnly
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

export default FormEdit;
