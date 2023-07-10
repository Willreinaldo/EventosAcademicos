const express = require('express');
var neo4j = require('neo4j-driver');
const mongoose = require('../backend/database/database');
const {addPonto, getPontos, atualizarPonto, buscarPonto, deletarPonto, buscarEventos } = require('../backend/controllers/PontoController.js');
const { cadastrarUsuario, realizarLogin } = require('../backend/controllers/UserController.js');

const cors = require('cors');

var driver = neo4j.driver(
  'neo4j://localhost:7687',
  neo4j.auth.basic('neo4j', 'neo4j123456')
);

const testarConexaoNeo4j = async () => {
  const session = driver.session();

  try {

    const result = await session.run('RETURN 1');
    console.log(result.records[0].get(0)); 
    console.log('Conexão ao Neo4j estabelecida com sucesso!');
  } catch (error) {
    console.error('Falha ao conectar ao Neo4j:', error);
  } finally {
    session.close();
  }
};

// Chamar a função de teste de conexão
testarConexaoNeo4j();

 const app = express();

 app.use(cors());

 app.use(express.json());

 

 mongoose.connection.on('connected', () => {
  console.log('Conexão com o MongoDB estabelecida com sucesso!');
});



// Definir as rotas
app.post('/pontos', addPonto);
app.get('/pontos/buscar', buscarEventos);  
app.get('/pontos/:id', buscarPonto);
app.put('/pontos/:id',atualizarPonto);
app.delete('/pontos/:id',deletarPonto);
app.get('/pontos',  getPontos);

app.post('/usuarios/cadastrar', cadastrarUsuario);
app.post('/usuarios/login', realizarLogin); 

// Inicia o servidor
const port = 4000;
app.listen(port, async () => {
    console.log(`Servidor rodando na porta ${port}`);
  });