const Ponto = require('../models/ponto');

const addPonto = async (request, response) => {
  console.log(request.body);
const { nome, descricao, localizacao, dataInicio, dataTermino } = request.body;
const [lng, lat] = localizacao.split(',').map(parseFloat);

const geometria = { type: 'Point', coordinates: [lng, lat] };

const ponto = new Ponto({ nome, descricao, dataInicio, dataTermino, geometria });
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

const buscarPonto = async (req, res) => {
  const { id } = req.params;  
  try {
    const ponto = await Ponto.findById(id).lean();  

    if (!ponto) {
      return res.status(404).json({ message: "Ponto não encontrado." });
    }

    res.json(ponto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar o ponto." });
  }
};

const buscarEventos = async (req, res) => {
  const { searchTerm } = req.query;
  console.log("searchTerm: ", searchTerm);

  try {
    let eventos;
    if (searchTerm) {
      eventos = await Ponto.find(
        { $text: { $search: searchTerm } },
        { score: { $meta: 'textScore' } }
      )
        .sort({ score: { $meta: 'textScore' } })
        .exec();
    } else {
      eventos = await Ponto.find();
    }
    console.log(eventos);
    res.json(eventos);
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar eventos.' });
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
  const { nome, descricao, localizacao, dataInicio, dataTermino } = request.body;
  const coordenadas = localizacao.split(',').map(coord => parseFloat(coord.trim()));

  try {
    const ponto = await Ponto.findByIdAndUpdate(id, {
      nome,
      descricao,
      geometria: {
        type: "Point",
        coordinates: coordenadas,
      },
      dataInicio,
      dataTermino,
    }, { new: true });

    if (!ponto) {
      return response.status(404).send('Ponto não encontrado.');
    }

    response.status(200).send('Ponto atualizado com sucesso.');
  } catch (error) {
    console.error(error);
    response.status(500).send('Falha ao atualizar o ponto.');
  }
};

module.exports = { addPonto,buscarEventos, getPontos, buscarPonto, atualizarPonto, deletarPonto };