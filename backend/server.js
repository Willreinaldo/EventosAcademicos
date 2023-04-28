 const express = require('express');
const {addPonto, getPontos, sincronizar, atualizarPonto, buscarPonto, deletarPonto} = require('../backend/controllers/PontoController.js');
const cors = require('cors');

 const app = express();

 app.use(cors());

 app.use(express.json());

// Chama a função de sincronização antes de iniciar o servidor
sincronizar().catch(err => console.error(err));

// Definir as rotas
app.post('/pontos', addPonto);
app.get('/pontos/:id', buscarPonto);
app.put('/pontos/:id',atualizarPonto);
app.delete('/pontos/:id',deletarPonto);
app.get('/pontos',  getPontos);



// Iniciar o servidor
const port = 4000;
app.listen(port, async () => {
    console.log(`Servidor rodando na porta ${port}`);
  });