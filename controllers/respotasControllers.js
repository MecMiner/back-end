const Respostas = require("../models/Respostas");
const Desafio = require("../models/Desafio"); // Import Desafio model

exports.getRespostas = async (req, res) => {
    try {
        const { id } = req.params;
        const idusuario = req.user.id;

        if (!idusuario || !id) {
            return res.status(400).json({
                erro: true,
                mensagem: "Invalid user ID or challenge ID"
            });
        }

        console.log(`Fetching challenge: ${id} for user: ${idusuario}`);

        const desafioExiste = await Desafio.findByPk(id);
        if (!desafioExiste) {
            return res.status(404).json({
                erro: true,
                mensagem: "Challenge not found"
            });
        }

        let response = await Respostas.findOne({
            where: {
                iddesafio: id,
                idusuario: idusuario,
            },
        });

        if (!response) {
            response = await Respostas.create({
                iddesafio: id,
                idusuario: idusuario,
                statusNivel2: { jogou: false, corrigido: false, certo: false, erros: 0, feedback: "" },
                statusNivel3: { jogou: false, corrigido: false, certo: false, erros: 0, feedback: "" },
                statusNivel4: { jogou: false, corrigido: false, certo: false, erros: 0, feedback: "" },
                respostanivel2: "",
                respostanivel3: "",
                respostanivel4: "",
                nivel: 1,
            });
        }

        const { iddesafio, idusuario: _, ...filteredResponse } = response.toJSON();

        return res.json({
            erro: false,
            mensagem: "Responses retrieved successfully",
            respostas: filteredResponse,
        });
    } catch (error) {
        console.error("Error fetching responses:", error);
        return res.status(500).json({
            erro: true,
            mensagem: "Error fetching responses"
        });
    }
};

exports.setRespostas = async (req, res) => {
    try {
        const { id } = req.params;
        const idusuario = req.user.id;
        const { respostanivel2, respostanivel3, respostanivel4, statusNivel2, statusNivel3, statusNivel4, nivel } = req.body;

        const desafioExiste = await Desafio.findByPk(id);
        if (!desafioExiste) {
            return res.status(404).json({
                erro: true,
                mensagem: "Challenge not found"
            });
        }

        let response = await Respostas.findOne({
            where: {
                iddesafio: id,
                idusuario: idusuario,
            },
        });

        if (!response) {
            return res.status(404).json({
                erro: true,
                mensagem: "Responses not found for this challenge",
            });
        }

        // Atualiza as respostas apenas se forem passadas no body
        if (respostanivel2 !== undefined) response.respostanivel2 = respostanivel2;
        if (respostanivel3 !== undefined) response.respostanivel3 = respostanivel3;
        if (respostanivel4 !== undefined) response.respostanivel4 = respostanivel4;

        // Atualiza statusNivel2 apenas com as propriedades passadas no body
        if (statusNivel2) {
            response.statusNivel2 = {
                ...(response.statusNivel2 || {}), // Mantém os valores existentes
                ...statusNivel2 // Sobrescreve com os novos valores passados no body
            };
        }

        // Atualiza statusNivel3 apenas com as propriedades passadas no body
        if (statusNivel3) {
            response.statusNivel3 = {
                ...(response.statusNivel3 || {}), // Mantém os valores existentes
                ...statusNivel3 // Sobrescreve com os novos valores passados no body
            };
        }

        // Atualiza statusNivel4 apenas com as propriedades passadas no body
        if (statusNivel4) {
            response.statusNivel4 = {
                ...(response.statusNivel4 || {}), // Mantém os valores existentes
                ...statusNivel4 // Sobrescreve com os novos valores passados no body
            };
        }

        // Atualiza o nível apenas se for passado no body e for maior que o atual
        if (nivel !== undefined && nivel > response.nivel) {
            response.nivel = nivel;
        }

        await response.save();

        const { iddesafio, idusuario: _, ...filteredResponse } = response.toJSON();

        return res.json({
            erro: false,
            mensagem: "Responses updated successfully",
            resposta: filteredResponse
        });
    } catch (error) {
        console.error("Error updating response:", error);
        return res.status(500).json({
            erro: true,
            mensagem: "Error updating response"
        });
    }
};