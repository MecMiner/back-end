const {Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const DesafioNivel2 = db.define('DesafioNivel2', {
  iddesafio: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  idexemploNivel: {
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
  dicaColega: {
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
  tableName: 'desafionivel2',
  timestamps: false
});

module.exports = DesafioNivel2;
