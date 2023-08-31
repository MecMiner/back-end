const express = require('express')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 8080;

const Usuario = require('./models/Usuario');
const Respostas = require('./models/Respostas');
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

app.get('/', verifyToken,async (req, res) => {
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
})

app.post('/setPts', verifyToken, async (req, res) => {
    const idusuario = req.user.id;
    const { pontos, xp, bomDesempenho, otimoDesempenho, colaboracao} = req.body;
    await Usuario.findOne({
        where: {
            id: idusuario,
        },
    }).then(async (response) => {
        if (!response) {
            return res.json({
                erro: true,
                message: 'Dados não encontrado',
            })
        } else {
            response.bomDesempenho = bomDesempenho ? parseInt(bomDesempenho) : response.bomDesempenho;
            response.otimoDesempenho = otimoDesempenho ? parseInt(otimoDesempenho) : response.otimoDesempenho;
            response.colaboracao = colaboracao ? parseInt(colaboracao) : response.colaboracao;
            response.pontos = pontos ? parseInt(pontos) : response.pontos;
            response.xp = xp ? parseInt(xp): response.pontos;
                   
            response.save()
            console.log(response);
            await Usuario.update(
                response,
                {
                    where: {
                        idusuario: idusuario,
                    },
                }).then(() => {
                    return res.json({
                        error: false,
                        mensagem: "valor inserido"

                    });
                }).catch((e) => {
                    return res.json({
                        error: true,
                        mensagem: "valor não inserido"
                    });
                })
        }
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Usuario não encontrado"
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
    await Desafio.findOne({ where: { iddesafio: id } }).then((dataDesafio) => {
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

app.get('/desafio2/:id', async (req, res) => {
    const { id } = req.params;
    await Desafio2.findOne({ where: { iddesafio: id } }).then((dataDesafio) => {
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

app.get('/desafio3/:id', async (req, res) => {
    const { id } = req.params;
    await Desafio3e4.findOne({ where: { iddesafio: id } }).then((dataDesafio) => {
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
    await Respostas.findOne({
        where: {
            iddesafio: id,
            idusuario: idusuario,
        },
    }).then(async (response) => {
        if (!response) {
            const dataRespostas = await Respostas.create({
                iddesafio: id,
                idusuario: idusuario,
                statusNivel2: {
                    jogou: false,
                    corrigido: false,
                    certo: false,
                    erros: 0,
                    feedback: ""
                },
                statusNivel3: {
                    jogou: false,
                    corrigido: false,
                    certo: false,
                    erros: 0,
                    feedback: ""
                },
                statusNivel4: {
                    jogou: false,
                    corrigido: false,
                    certo: false,
                    erros: 0,
                    feedback: ""
                },
                respostanivel2: "",
                respostanivel3: "",
                respostanivel4: "",
            })
            return res.json({
                erro: true,
                dataRespostas: dataRespostas,
            })
        } else {
            return res.json({
                erro: false,
                response,
            })
        }
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Desafio não encontrado"
        })
    })
})

app.post('/respostas/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const idusuario = req.user.id;
    const {resposta2, resposta3, resposta4,statusNivel2, statusNivel3,statusNivel4, nivel } = req.body;
    await Respostas.findOne({
        where: {
            iddesafio: id,
            idusuario: idusuario,
        },
    }).then(async (response) => {
        if (!response) {
            return res.json({
                erro: true,
                message: 'Dados não encontrado',
            })
        } else {
            response.respostanivel2 = resposta2 ? resposta2 : response.respostanivel2;
            response.respostanivel3 = resposta3 ? resposta3 : response.respostanivel3;;
            response.respostanivel4 = resposta4 ? resposta4 : response.respostanivel4;;
            response.statusNivel2 = statusNivel2 ? statusNivel2 : response.statusNivel2;
            response.statusNivel3 = statusNivel3 ? statusNivel3 : response.statusNivel3;
            response.statusNivel4 = statusNivel4 ? statusNivel4 : response.statusNivel4;
            if (nivel && nivel > response.nivel) {
                response.nivel = nivel;
            }
            
            
            
            response.save()
            console.log(response);
            await Respostas.update(
                response,
                {
                    where: {
                        iddesafio: id,
                        idusuario: idusuario,
                    },
                }).then(() => {
                    return res.json({
                        error: false,
                        mensagem: "valor inserido"

                    });
                }).catch((e) => {
                    return res.json({
                        error: true,
                        mensagem: "valor não inserido"
                    });
                })
        }
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Desafio não encontrado"
        })
    })
})

app.post('/setPts', verifyToken, async (req, res) => {
    const idusuario = req.user.id;
    const { pontos, xp, bomDesempenho, otimoDesempenho, colaboracao} = req.body;
    await Usuario.findOne({
        where: {
            id: idusuario,
        },
    }).then(async (response) => {
        if (!response) {
            return res.json({
                erro: true,
                message: 'Dados não encontrado',
            })
        } else {
            response.bomDesempenho = bomDesempenho ? parseInt(bomDesempenho) : response.bomDesempenho;
            response.otimoDesempenho = otimoDesempenho ? parseInt(otimoDesempenho) : response.otimoDesempenho;
            response.colaboracao = colaboracao ? parseInt(colaboracao) : response.colaboracao;
            response.pontos = pontos ? parseInt(pontos) : response.pontos;
            response.xp = xp ? parseInt(xp): response.pontos;
                   
            response.save()
            console.log(response);
            await Usuario.update(
                response,
                {
                    where: {
                        idusuario: idusuario,
                    },
                }).then(() => {
                    return res.json({
                        error: false,
                        mensagem: "valor inserido"

                    });
                }).catch((e) => {
                    return res.json({
                        error: true,
                        mensagem: "valor não inserido"
                    });
                })
        }
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Usuario não encontrado"
        })
    })
})


app.post('/login', async (req, res) => {
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
});

//Faz alteração na tabela de acordo com as models
//Usuario.sync({alter: true});
app.listen(port, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});