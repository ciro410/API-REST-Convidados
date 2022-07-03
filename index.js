const express = require('express');
const { travadeSenha } = require('./middlewares/middleware');
const { roteador } = require('./routes/rotas');
const app = express();

app.use(express.json());
app.use(travadeSenha)
app.use(roteador)
app.listen(8000)