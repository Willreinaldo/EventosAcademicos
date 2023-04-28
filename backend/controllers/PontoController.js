const Ponto = require('../models/ponto'); 

const addPonto = async (request, response) =>{
    console.log(request);
    const nome = request.body.nome;
    const descricao = request.body.descricao;
    const localizacao = request.body.localizacao;
    const [lng, lat] = localizacao.split(',').map(parseFloat);

    const geometria = {type: 'Point', coordinates:[lng, lat]};


    const ponto = Ponto.build({nome, descricao, geometria});
    console.log(ponto);
    ponto.save().then(()=>{
        response.status(200).send('Ponto salvo!');
    }).catch(err =>{
        response.status(400).send('Falha ao salvar');
    });

};

const getPontos = async (request, response) =>{
    const pontos = await Ponto.findAll();
    response.status(200).send(pontos);
}

const buscarPonto = async (request, response) => {
  const {id}  = request.params;  
  try {
    const ponto = await Ponto.findByPk(id);  
    if (!ponto) {
      return res.status(404).send("Ponto não encontrado."); 
    }
    response.status(200).json(ponto);  
  } catch (error) {
    console.error(error);
    res.status(500).send("Falha ao buscar o ponto.");
  }
};
const deletarPonto = async (request, response) => {
  const { id } = request.params;  
  try {
    const ponto = await Ponto.findByPk(id); 
    if (!ponto) {
      return response.status(404).send("Ponto não encontrado."); 
    }
    await ponto.destroy(); // Deleta o ponto
    response.status(200).send("Ponto deletado com sucesso.");
  } catch (error) {
    console.error(error);
    response.status(500).send("Falha ao deletar o ponto.");
  }
};

const atualizarPonto = async (request, response) => {
    const { id } = request.params;  
     console.log(id);
    const { nome, descricao, localizacao } = request.body;  
    try {
      const ponto = await Ponto.findByPk(id); // Encontre o ponto com o ID fornecido
  
      if (!ponto) {
        return response.status(404).send("Ponto não encontrado.");  
      }
  
      await ponto.update({ nome, descricao, localizacao });  
      response.status(200).send("Ponto atualizado com sucesso.");
    } catch (error) {
      console.error(error);
      response.status(500).send("Falha ao atualizar o ponto.");
    }
  };

const sincronizar = async () =>{
    await Ponto.sync();
    console.log('Sincronizado');
};


module.exports = {addPonto, sincronizar, getPontos, buscarPonto, atualizarPonto, deletarPonto};