const express = require('express')
const { verifyToken } = require('../controllers/tokenController')
const routerToken = express.Router()

routerToken.post('/verify-token', verifyToken)

module.exports =  routerToken