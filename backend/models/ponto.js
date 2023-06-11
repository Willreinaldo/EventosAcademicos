const mongoose = require('mongoose');

const pontoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
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
  },
});

const Ponto = mongoose.model('Ponto', pontoSchema,'EventosAcademicos');

module.exports = Ponto;