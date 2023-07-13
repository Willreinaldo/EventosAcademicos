import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/usuarios/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });
      if (response.ok) {
        const data = await response.json();
        const token = data.token; 
       localStorage.setItem('token', token);

        console.log('Login realizado com sucesso!'); 
        window.alert("Login realizado com sucesso!");
        setEmail('');
        setSenha('');
        navigate("/");  

      }  
      else{
        window.alert("Erro no login!");
      }
    } catch (error) {
      console.error(error);  
      window.alert("Erro no login!");
    }
  };

  return (
    <div className="container">
      <div className="has-text-centered">
        <br></br>
        <h1 className="title is-4">Login</h1>
        <br></br>

      </div>
      <form onSubmit={handleSubmit} className="is-flex is-flex-direction-column">
        <div className="field is-flex is-justify-content-center">
          <label className="label">E-mail</label>
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
          <label className="label">Senha</label>
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
              Entrar
            </button>
          </div>
        </div>

        <div className="field">
          <div className="control has-text-centered">
            <p>
              Não tem uma conta ainda?{' '}
              <Link to="/cadastro">Cadastre-se</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;