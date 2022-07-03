const express = require('express');
const roteador = express();
const { consultarConvidado, adicionarConvidado, deletarConvidado } = require('../controllers/controler')

roteador.get('/convidados',consultarConvidado)

roteador.post('/convidados',adicionarConvidado)

roteador.delete('/convidados/:nome',deletarConvidado)

module.exports = {roteador};