const jwt = require('jsonwebtoken');
const User = require('../models/user');

//BANCO DE DADOS NEO4J  - CONFIG
const neo4j = require('neo4j-driver');
const driver = neo4j.driver(
  'neo4j://localhost:7687',
  neo4j.auth.basic('neo4j', 'neo4j123456')
);


const gerarToken = (usuarioId) => {
  const token = jwt.sign({ id: usuarioId }, 'chave_secreta');
  console.log("token gerado", token);
  return token;
};

const verificarToken = (req, res, next) => {
  const tokenWithBearer = req.headers.authorization;

  if (tokenWithBearer == null) return res.sendStatus(401)

  const token = tokenWithBearer.replace('Bearer', '');

  console.log("token recebido da req do localstorage", token);
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, 'chave_secreta', (err, decoded) => {
    if (err) {
      console.log("ERRO NO TOKEN: ", err);
      return res.status(403).json({ error: 'Token inválido' });
    }

    req.usuarioId = decoded.id;
    next();
  });
};

const buscarUsuarioLogado = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;

    const usuario = await User.findById(usuarioId);

    // Verifique se o usuário foi encontrado
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Retorne os dados do usuário
    res.status(200).json(usuario);

  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário logado' });
  }
};

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {

    const usuarioExistente = await User.findOne({ email });

    if (usuarioExistente) {
      console.log("'E-mail já cadastrado' ");
      return res.status(409).json({ error: 'E-mail já cadastrado!' });
    }

    let novoUsuario;

    try {
      novoUsuario = new User({ nome, email, senha });
      await novoUsuario.save();

      // Código para criar o nó no Neo4j
      const session = driver.session();

      try {
        const result = await session.run(
          'CREATE (u:Usuario {id: $usuarioId, nome: $nome})',
          { usuarioId: novoUsuario._id.toString(), nome }
        );

        result.records.forEach((record) => {
          const nome = record.get('u.nome');
          console.log(nome);
        });

        console.log('Nó de usuário criado com sucesso no Neo4j');
      } catch (error) {
        console.error('Erro ao criar nó de usuário no Neo4j:', error);
        return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
      } finally {
        session.close();
      }

      res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
      console.error("error from CREATE ON MONGO DB: ", error);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
};

const realizarLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) {
      console.log("Usuário não encontrado'");
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (senha !== usuario.senha) {
      console.log("Credenciais inválidas")
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = gerarToken(usuario._id.toString());

    res.status(200).json({ token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
};

module.exports = {
  cadastrarUsuario,
  realizarLogin,
  verificarToken,
  buscarUsuarioLogado
};