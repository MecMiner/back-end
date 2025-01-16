const { chaveToken } = require("../config");
const Usuario = require("../models/Usuario");

exports.loginPost = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Encontra o usuário no banco de dados com base no email fornecido
        const user = await Usuario.findOne({ where: { email } });
        console.log(user);

        if (!user) {
            console.log("email invalido")
            return res.status(401).json({ message: 'Usuário inválido' });
        }
        console.log(user.senha);
        console.log(senha);
        // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
        const passwordMatch = senha === user.senha;

        console.log(passwordMatch);

        if (!passwordMatch) {
            console.log("senha invalido")
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Gera o token de autenticação
        const token = jwt.sign({ id: user.id, email: user.email }, chaveToken, { expiresIn: '4h' });
        const respostas = await Respostas.findAll({ where: { idusuario: user.id } })
        // Retorna o token como resposta
        console.log(token);
        res.status(200).json({ token, user: { name: user.nome }, respostas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao processar a requisição' });
    }
}


exports.getLogin = async (req, res) => {
    const idusuario = req.user.id;
    await Usuario.findOne({
        where: {
            id: idusuario,
        },
    }).then((dataUsuario) => {
        return res.json({
            erro: false,
            dataUsuario
        })
    }).catch(() => {
        return res.json({
            erro: true,
            mensagem: "Usuario não cadastrado"
        })
    })
}