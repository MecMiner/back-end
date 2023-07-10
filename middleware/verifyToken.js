const jwt = require('jsonwebtoken');
const { chaveToken } = require('../config');


const verifyToken = (req, res, next) => {
    // Verifique o token no cabeçalho da solicitação, cookies ou qualquer outra fonte em que você está enviando o token
  
    const token = req.headers.authorization;
  
    // Verifique se o token está presente
    if (!token) {
      return res.status(401).json({ error: true, message: 'Token de autenticação não fornecido' });
    }
  
    try {
      // Verifica se o token é válido
      const decoded = jwt.verify(token, chaveToken);
  
      // Armazene as informações do usuário no objeto de solicitação para uso posterior, se necessário
      req.user = decoded;
      console.log('token válido');
  
      // Continue para a próxima rota
      next();
    } catch (error) {
        console.log('token invalido')
      return res.status(401).json({error: true, message: 'Token de autenticação inválido' });
    }
  };

  module.exports = verifyToken;