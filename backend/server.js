// Importar os módulos necessários
const express = require('express');
const {addPonto, getPontos} = require('../backend/controllers/PontoController.js');
const cors = require('cors');

// Criar a aplicação
const app = express();

// Configurar o CORS
app.use(cors());

// Configurar o JSON como formato de requisição
app.use(express.json());

// Definir as rotas
app.post('/pontos', addPonto);
app.get('/pontos',  getPontos);

// Iniciar o servidor
const port = 4000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));