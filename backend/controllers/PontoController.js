const Ponto = require('../models/ponto');
const driver = require('../database/neo4j');

const addPonto = async (request, response) => {
  const { nome, descricao, localizacao, dataInicio, dataTermino, usuarioId } = request.body;

  // Código para criar o evento no MongoDB
  const ponto = new Ponto({
    nome,
    descricao,
    localizacao,
    dataInicio,
    dataTermino,
  });

  try {
    await ponto.save();
    console.log('Evento salvo no MongoDB');

    // Código para criar a relação no Neo4j
    const session = driver.session();

    try {
      const result = await session.run(
        'MATCH (u:Usuario {id: $usuarioId}), (e:Evento {id: $eventoId}) CREATE (u)-[:RELACIONADO]->(e)',
        { usuarioId, eventoId: ponto._id.toString() }
      );

      console.log('Relacionamento criado com sucesso no Neo4j');
    } catch (error) {
      console.error('Erro ao criar relacionamento no Neo4j:', error);
      response.status(500).json({ error: 'Erro ao criar relacionamento no Neo4j' });
      return;
    } finally {
      session.close();
      driver.close();
    }

    response.status(200).send('Ponto salvo e relacionamento criado com sucesso');
  } catch (err) {
    console.error(err);
    response.status(400).send('Falha ao salvar evento');
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
      eventos = await Ponto.find({
        $or: [
          { nome: { $regex: searchTerm, $options: 'i' } },
          { descricao: { $regex: searchTerm, $options: 'i' } }
        ]
      });
    }else {
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