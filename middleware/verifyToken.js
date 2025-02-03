const jwt = require('jsonwebtoken');
const { chaveToken } = require('../config');

const verifyToken = (req, res, next) => {
    // Verifica o token no cabeçalho da requisição
    const authorization = req.headers['authorization']; // Certifique-se de usar 'authorization' (minúsculo)

    if (!authorization) {
        return res.status(401).json({
            error: true,
            mensagem: 'Unauthorized'
        });
    }

    const token = authorization.split(" ")[1]; // Divide pelo espaço para obter o token
    console.log(token)
    if (!token) {
        return res.status(401).json({
            error: true,
            mensagem: 'Unauthorized'
        });
    }

    console.log(token);

    try {
        // Verifica se o token é válido
        const decoded = jwt.verify(token, chaveToken);

        // Armazena as informações do usuário na requisição para uso posterior
        req.user = decoded;
        console.log('Token válido');

        // Chama o próximo middleware ou rota
        next();
    } catch (error) {
        console.log('Token inválido');
        return res.status(401).json({ error: true, message: 'Token de autenticação inválido' });
    }
};

module.exports = verifyToken;
