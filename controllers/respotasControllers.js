const Respostas = require("../models/Respostas");

exports.getRespostas = async (req, res) => {
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
                nivel : 1,
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
}

exports.setRespostas = async (req, res) => {
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
}