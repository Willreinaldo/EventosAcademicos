const Ponto = require('../models/ponto');
 
//BANCO DE DADOS NEO4J  - CONFIG
const neo4j = require('neo4j-driver');
const driver = neo4j.driver(
  'neo4j://localhost:7687',
  neo4j.auth.basic('neo4j', 'neo4j123456')
);

const addPonto = async (request, response) => {
  const { nome, descricao, localizacao, dataInicio, dataTermino, geometria } = request.body;

  // Código para criar o evento no MongoDB
  const ponto = new Ponto({
    nome,
    descricao,
    localizacao,
    dataInicio,
    dataTermino,
    geometria
  });
  console.log("geometria:", geometria);
  const { usuario } = geometria;
  const usuarioId = usuario;

  try {
    await ponto.save();
    console.log('Evento salvo no MongoDB');

    // Código para criar o nó do evento no Neo4j e relacioná-lo ao usuário
    const session = driver.session();

    try {
      // Criação do nó do evento no Neo4j
      const result = await session.run(
        'CREATE (e:Evento {id: $eventoId, nome: $nome})',
        { eventoId: ponto._id.toString(), nome }
      );
      console.log('Evento salvo no Neo4j', usuarioId);

      const relacionamento = await session.run(
        'MATCH (u:Usuario {id: $usuarioId}), (e:Evento {id: $eventoId}) CREATE (u)-[:PARTICIPA]->(e)',
        { usuarioId: usuarioId, eventoId: ponto._id.toString() }
      );
      console.log('Relacionamento criado com sucesso no Neo4j');
    } catch (error) {
      console.error('Erro ao criar evento ou relacionamento no Neo4j:', error);
      response.status(500).json({ error: 'Erro ao criar evento ou relacionamento no Neo4j' });
      
      return;
    } finally {
      session.close();
      driver.close();
    }

    response.status(200).send('Evento salvo e relacionamento criado com sucesso');
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
    // Excluir evento no MongoDB
    const ponto = await Ponto.findByIdAndDelete(id);
    if (!ponto) {
      return response.status(404).send('Ponto não encontrado.');
    }

    // Excluir evento no Neo4j
    const session = driver.session();
    try {
      await session.run('MATCH (e:Evento {id: $eventoId}) DETACH DELETE e', { eventoId: id });
      console.log('Evento excluído do Neo4j');

      response.status(200).send('Ponto deletado com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir evento do Neo4j:', error);
      response.sendStatus(500);
    } finally {
      session.close();
    }
  } catch (error) {
    console.error(error);
    response.status(500).send('Falha ao deletar o ponto no MongoDB.');
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

module.exports = { addPonto, buscarEventos, getPontos, buscarPonto, atualizarPonto, deletarPonto };