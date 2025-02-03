const { chaveToken } = require("../config");
const jwt = require('jsonwebtoken');
const Usuario = require("../models/Usuario");
const Respostas = require("../models/Respostas");

exports.loginPost = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Encontra o usuário no banco de dados com base no email fornecido
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({error: true, message: 'Incorrect email or password' });
        }
        // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
        const passwordMatch = senha === user.senha;
        if (!passwordMatch) {
            return res.status(401).json({error: true, message: 'Incorrect email or password' });
        }

        // Gera o token de autenticação
        const token = jwt.sign({ id: user.id, email: user.email }, chaveToken, { expiresIn: '4h' });
        const respostas = await Respostas.findAll({ where: { idusuario: user.id } })
        // Retorna o token como resposta
        res.status(200).json({error: false, token});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: true, message: 'Error processing request' });
    }
}


exports.getLogin = async (req, res) => {
    const idusuario = req.user.id;
    await Usuario.findByPk(idusuario, {
        attributes: { exclude: ['senha', 'id'] }
    }).then((dataUsuario) => {
        return res.json({
            erro: false,
            dataUsuario
        })
    }).catch(() => {
        return res.json({
            erro: true,
            mensagem: "Unregistered user"
        })
    })
}