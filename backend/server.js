const express = require('express');
const mongoose = require('../backend/database/database');
const {addPonto, getPontos, atualizarPonto, buscarPonto, deletarPonto, buscarEventos } = require('../backend/controllers/PontoController.js');
const { cadastrarUsuario, realizarLogin, associarEventoUsuario, buscarUsuarioLogado, verificarToken } = require('../backend/controllers/UserController.js');

const cors = require('cors');
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
app.get('/pontos', getPontos);
app.post('/usuarios/cadastrar', cadastrarUsuario);
app.post('/usuarios/login', realizarLogin); 
app.get('/usuarios/usuario',verificarToken, buscarUsuarioLogado); 
app.post('/usuarios/associarEvento', associarEventoUsuario);


// Inicia o servidor
const port = 4000;
app.listen(port, async () => {
    console.log(`Servidor rodando na porta ${port}`);
  });