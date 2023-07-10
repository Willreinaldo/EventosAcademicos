import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

const Cadastro = () => {

  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/usuarios/cadastrar", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (response.ok) {
        window.alert('Cadastro realizado com sucesso!'); 
        setNome('');
        setEmail('');
        setSenha('');
        navigate("/login");  

      } else {
        window.alert('Ocorreu um erro ao cadastrar. Por favor, tente novamente.');  
      }
    } catch (error) {
      window.alert('Ocorreu um erro ao cadastrar. Por favor, tente novamente.');  
    }
  };
  return (
    <div className="container">
        <br></br>
      <div className="has-text-centered">
        <h1 className="title is-4">Cadastro</h1>
      </div>
      <br></br>
      <form onSubmit={handleSubmit} className="is-flex is-flex-direction-column">
        <div className="field is-flex is-justify-content-center">
          <label className="label">Nome: </label>
          <div className="control">
            <input
              className="input is-small"
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field is-flex is-justify-content-center">
          <label className="label">E-mail: </label>
          <div className="control">
            <input
              className="input is-small"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field is-flex is-justify-content-center">
          <label className="label">Senha: </label>
          <div className="control">
            <input
              className="input is-small"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field">
          <div className="control has-text-centered">
            <button className="button is-primary" type="submit">
              Cadastrar
            </button>
          </div>
          <br></br>
           <div className="control has-text-centered">
            <p>
              Já tem uma conta?{' '}
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;