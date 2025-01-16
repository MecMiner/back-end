const express = require('express')
const { loginPost, getLogin } = require('../controllers/loginControllers')
const verifyToken = require('../middleware/verifyToken')
const routerLogin = express.Router()

routerLogin.post('/login', loginPost)
routerLogin.get('/', verifyToken, getLogin)

module.exports = routerLogin;