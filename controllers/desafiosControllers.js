const Desafio = require("../models/Desafio")
const DesafioNivel2 = require("../models/Desafio2")
const DesafioNivel3e4 = require("../models/Desafio3e4")

exports.getDesafios = async (req, res) => {
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
}

exports.getDesafio1 = async (req, res) => {
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
}

exports.getDesafio2 = async (req, res) => {
    const { id } = req.params;
    await DesafioNivel2.findOne({ where: { iddesafio: id } }).then((dataDesafio) => {
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
}

exports.getDesafio3 = async (req, res) => {
    const { id } = req.params;
    await DesafioNivel3e4.findOne({ where: { iddesafio: id } }).then((dataDesafio) => {
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
}