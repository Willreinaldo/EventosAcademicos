const Ponto = require('../models/ponto'); 

const addPonto = async (request, response) =>{
    console.log(request);
    const nome = request.body.nome;
    const descricao = request.body.descricao;
    const localizacao = request.body.localizacao;
    const [lng, lat] = localizacao.split(',').map(parseFloat);

    const geometria = {type: 'Point', coordinates:[lng, lat]};

    console.log(geometria);

    const ponto = Ponto.build({nome, descricao, geometria});
    ponto.save().then(()=>{
        response.status(200).send('Ponto salvo!');
    }).catch(err =>{
        response.status(400).send('Falha ao salvar');
    });

};

const getPontos = async (request, response) =>{
    const pontos = await Ponto.findAll();
    response.status(200).send(pontos);
}

const sincronizar = async(request, response) =>{
    await Ponto.sync();
    response.status(200).send('Sincronizado');
};

module.exports = {addPonto, sincronizar, getPontos};