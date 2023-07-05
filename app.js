const express = require('express')
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

const Usuario = require('./models/Usuario');
const Respotas = require('./models/Respostas');
const Desafio = require('./models/Desafio');
const Desafio2 = require('./models/Desafio2');
const Desafio3e4 = require('./models/Desafio3e4');
const verifyToken = require('./middleware/verifyToken');
const { chaveToken } = require('./config');



app.use(cors());
//Fazer conexão entre BackEnd e FrontEnd

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //Configura rotas que podem fazer requisição
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE"); //Configurar métodos aceitos pela API
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
})

app.get('/', async (req, res) => {
    await Usuario.findAll().then((dataUsaurio) => {
        return res.json({
            erro: false,
            dataUsaurio
        })
    }).catch(() => {
        return res.json({
            erro: true,
            mensagem: "Usuarios não cadastrados"
        })
    })
})

app.post('/verify-token', (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({ valid: false });
    }

    jwt.verify(token, chaveToken, (err, decoded) => {
        if (err) {
            return res.json({ valid: false });
        }

        // Token válido
        return res.json({ valid: true });
    });
});

app.get('/desafio', async (req, res) => {
    await Desafio.findAll().then((dataDesafio) => {
        return res.json({
            erro: false,
            dataDesafio
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Desafio não encontrado"
        })
    })
})

app.get('/desafio1/:id', async (req, res) => {
    const { id } = req.params;
    await Desafio.findOne({where: {iddesafio: id}}).then((dataDesafio) => {
        return res.json({
            erro: false,
            dataDesafio
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Desafio não encontrado"
        })
    })
})

app.get('/desafio2', async (req, res) => {
    await Desafio2.findOne().then((dataDesafio) => {
        return res.json({
            erro: false,
            dataDesafio
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Desafio não encontrado"
        })
    })
})


app.get('/respostas/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const idusuario = req.user.id;


    try {
        const dataRespostas = await Respotas.findOne({
            where: {
                iddesafio: id,
                idusuario: idusuario,
            },
        });

        if (!dataRespostas) {
            dataRespostas = await Respotas.create({
                iddesafio: id,
                idusuario: idusuario,
                respostanivel1: "",
                respostanivel2: "",
                respostanivel3: "",
                respostanivel4: "",
                statusNivel1: 0,
                statusNivel2: 0,
                statusNivel3: 0,
                StatusNivel4: 0,
                pontos: 0,
                xp: 0,
            })
        }

        console.log(dataRespostas);
        return res.json({
            erro: false,
            dataRespostas,
        });
    } catch (error) {
        return res.status(500).json({
            erro: true,
            mensagem: 'Erroa ao busca respostas',
        })
    }

})


app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    console.log(req.body);

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
        const token = jwt.sign({ id: user.id, email: user.email }, chaveToken, { expiresIn: '1h' });
        const respostas = await Respotas.findAll({ where: { idusuario: user.id } })
        // Retorna o token como resposta
        console.log(token);
        res.status(200).json({ token, user: { name: user.nome }, respostas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao processar a requisição' });
    }
});

/* app.post('/setPoint/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const idusuario = req.user.id;
    const {pontos} = req.body

    try {
        const dataRespostas = await Respotas.update({
            where: {
                iddesafio: id,
                idusuario: idusuario,
            },
        });

        console.log(dataRespostas);
        return res.json({
            erro: false,
            dataRespostas,
        });
    } catch (error) {
        return res.status(500).json({
            erro: true,
            mensagem: 'Erroa ao busca respostas',
        })
    }



}) */

//Faz alteração na tabela de acordo com as models
//Usuario.sync({alter: true});
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});