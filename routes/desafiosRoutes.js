const express = require('express')
const { getDesafios, getDesafio1, getDesafio2, getDesafio3 } = require('../controllers/desafiosControllers')
const routerDesafios = express.Router()

routerDesafios.get('/desafio', getDesafios)
routerDesafios.get('/desafio1/:id', getDesafio1)
routerDesafios.get('/desafio2/:id', getDesafio2)
routerDesafios.get('/desafio3/:id', getDesafio3)

module.exports = routerDesafios