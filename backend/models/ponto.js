const mongoose = require('mongoose');

const pontoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    text: true
  },
  descricao: {
    type: String,
    required: true,
    text: true
  },
  dataInicio: {
    type: Date,
    required: true,
  },
  dataTermino: {
    type: Date,
    required: true,
  },
  geometria: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [String],
      required: true,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
});

const Ponto = mongoose.model('Ponto', pontoSchema,'Ponto');

module.exports = Ponto;