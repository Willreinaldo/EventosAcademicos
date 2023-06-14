const express = require('express');
const mongoose = require('../backend/database/database');
const configurarBancoDeDados = require('../backend/database/DBconfig');
const {addPonto, getPontos, atualizarPonto, buscarPonto, deletarPonto, buscarEventos } = require('../backend/controllers/PontoController.js');
const cors = require('cors');

 const app = express();

 app.use(cors());

 app.use(express.json());

 

 mongoose.connection.on('connected', () => {
  console.log('Conexão com o MongoDB estabelecida com sucesso!');
});

configurarBancoDeDados();


// Definir as rotas
app.post('/pontos', addPonto);
app.get('/pontos/:id', buscarPonto);
app.put('/pontos/:id',atualizarPonto);
app.delete('/pontos/:id',deletarPonto);
app.get('/pontos',  getPontos);
app.get('/eventos/buscar', buscarEventos);  


// Iniciar o servidor
const port = 4000;
app.listen(port, async () => {
    console.log(`Servidor rodando na porta ${port}`);
  });