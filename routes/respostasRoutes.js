const express = require('express');
const { setRespostas, getRespostas } = require('../controllers/respotasControllers');
const verifyToken = require('../middleware/verifyToken');
const routerRespostas = express.Router()

routerRespostas.post('/respostas/:id', verifyToken, setRespostas)
routerRespostas.get('/respostas/:id', verifyToken, getRespostas)

module.exports = routerRespostas;