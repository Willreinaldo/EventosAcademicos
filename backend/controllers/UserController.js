const jwt = require('jsonwebtoken');
const User = require('../models/user');

const gerarToken = (usuarioId) => {
  const token = jwt.sign({ id: usuarioId }, 'chave_secreta', { expiresIn: '1h' });
  return token;
};

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, 'chave_secreta', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    req.usuarioId = decoded.id;
    next();
  });
};

const buscarUsuarioLogado = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;

    // Faça a lógica necessária para buscar os dados do usuário com base no usuarioId
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
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    const novoUsuario = new User({ nome, email, senha });
    await novoUsuario.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
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

const associarEventoUsuario = async (req, res) => {
  const { usuarioId, eventoId } = req.body;

  try {
    await criarRelacaoEventoUsuario(usuarioId, eventoId);

    res.status(200).json({ message: 'Relacionamento criado com sucesso no Neo4j' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar relacionamento no Neo4j' });
  }
};

module.exports = {
  cadastrarUsuario,
  realizarLogin,
  verificarToken,
  associarEventoUsuario,
  buscarUsuarioLogado
};