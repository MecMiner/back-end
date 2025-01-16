const express = require('express')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 8080;

const Usuario = require('./models/Usuario');
const verifyToken = require('./middleware/verifyToken');
const routerLogin = require('./routes/loginRoutes');
const routerRespostas = require('./routes/respostasRoutes');
const routerDesafios = require('./routes/desafiosRoutes');
const routerToken = require('./routes/tokenRouter');


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


app.use('/', routerToken)
app.use('/', routerDesafios)
app.use('/', routerRespostas)
app.use('/', routerLogin)

//Faz alteração na tabela de acordo com as models
//Usuario.sync({alter: true});
app.listen(port, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});