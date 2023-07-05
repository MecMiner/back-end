const {Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const Desafio = db.define('Desafio', {
  iddesafio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idusuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  top1: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  top2: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  top3: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  idexemploNivel1: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  dadosProj: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  descProblema: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  nomeProjeto: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  contextoProblema: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  imagemProb: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  materialComplementar: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  solucao: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  etapasSolucao: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  dica: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  resultado: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  imagemResul: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  }
}, {
  tableName: 'desafio',
  timestamps: false
});

module.exports = Desafio;
