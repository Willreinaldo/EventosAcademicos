const Ponto = require('../models/ponto');

const addPonto = async (request, response) => {
  console.log(request.body);
const { nome, descricao, localizacao, dataInicio, dataTermino } = request.body;
const [lng, lat] = localizacao.split(',').map(parseFloat);

const geometria = { type: 'Point', coordinates: [lng, lat] };

const ponto = new Ponto({ nome, descricao, dataInicio, dataTermino, geometria });
  console.log(ponto);
  try {
    await ponto.save();
    response.status(200).send('Ponto salvo!');
  } catch (err) {
    console.error(err);
    response.status(400).send('Falha ao salvar');
  }
};

const getPontos = async (request, response) => {
  try {
    const pontos = await Ponto.find();
    response.status(200).send(pontos);
  } catch (err) {
    console.error(err);
    response.status(500).send('Falha ao buscar os pontos.');
  }
};

const buscarPonto = async (request, response) => {
  const { id } = request.params;
  try {
    const ponto = await Ponto.findById(id);
    if (!ponto) {
      return response.status(404).send('Ponto não encontrado.');
    }
    response.status(200).json(ponto);
  } catch (error) {
    console.error(error);
    response.status(500).send('Falha ao buscar o ponto.');
  }
};

const deletarPonto = async (request, response) => {
  const { id } = request.params;
  try {
    const ponto = await Ponto.findByIdAndDelete(id);
    if (!ponto) {
      return response.status(404).send('Ponto não encontrado.');
    }
    response.status(200).send('Ponto deletado com sucesso.');
  } catch (error) {
    console.error(error);
    response.status(500).send('Falha ao deletar o ponto.');
  }
};

const atualizarPonto = async (request, response) => {
  const { id } = request.params;
  console.log(id);
  const { nome, descricao, localizacao } = request.body;
  try {
    const ponto = await Ponto.findByIdAndUpdate(id, { nome, descricao, localizacao }, { new: true });
    if (!ponto) {
      return response.status(404).send('Ponto não encontrado.');
    }
    response.status(200).send('Ponto atualizado com sucesso.');
  } catch (error) {
    console.error(error);
    response.status(500).send('Falha ao atualizar o ponto.');
  }
};

module.exports = { addPonto, getPontos, buscarPonto, atualizarPonto, deletarPonto };