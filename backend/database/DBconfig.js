
const Ponto = require('../models/ponto');

const configurarBancoDeDados = async () => {
  try {
     const indexExists = await Ponto.collection.indexExists({ nome: 'text', descricao: 'text' });

     if (!indexExists) {
      await Ponto.createIndexes(
        { nome: 'text', descricao: 'text' },
        { weights: { nome: 2, descricao: 1 } }
      );

      console.log('Índice de texto criado com sucesso.');
    } else {
      console.log('Índice de texto já existe.');
    }
  } catch (error) {
    console.error('Falha ao criar o índice de texto:', error);
  }

} 
module.exports = configurarBancoDeDados;
