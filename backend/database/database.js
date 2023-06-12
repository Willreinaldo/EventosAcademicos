require('dotenv').config();
const mongoose = require('mongoose');


async function connectToMongoDB() {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.ATLAS_HOST}/?retryWrites=true&w=majority`, {
    dbName: 'EventosAcademicos', 
    useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexão com o MongoDB estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
}
connectToMongoDB();
module.exports = mongoose;