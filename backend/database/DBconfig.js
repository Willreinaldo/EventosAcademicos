
const Ponto = require('../models/ponto');

const configurarBancoDeDados = async () => {
    try {
      // Crie o índice de texto com os pesos
      await Ponto.createIndexes(
        { nome: 'text', descricao: 'text' },
        { weights: { nome: 2, descricao: 1 } }
      );
  
      console.log('Índice de texto criado com sucesso.');
    } catch (error) {
      console.error('Falha ao criar o índice de texto:', error);
    }

} 
module.exports = configurarBancoDeDados;
