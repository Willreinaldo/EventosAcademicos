const neo4j = require('neo4j-driver');

const driver = async () => neo4j.driver(
    'neo4j://localhost:7687',
    neo4j.auth.basic('neo4j', 'neo4j123456')
  );

  const criarRelacaoEventoUsuario = async (usuarioId, eventoId) => {
    const session = driver.session();
  
    try {
      await session.run('MATCH (u:Usuario {id: $usuarioId}), (e:Evento {id: $eventoId}) CREATE (u)-[:RELACIONADO]->(e)', {
        usuarioId,
        eventoId,
      });
  
      console.log('Relacionamento criado com sucesso no Neo4j');
    } catch (error) {
      console.error('Erro ao criar relacionamento no Neo4j:', error);
      throw error;
    } finally {
      session.close();
    }
  };
  module.exports = { driver, criarRelacaoEventoUsuario };