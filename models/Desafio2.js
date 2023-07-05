const {Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const DesafioNivel2 = db.define('DesafioNivel2', {
  iddesafio2: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  idexemploNivel2: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  dadosProj2: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  descProblema2: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  nomeProjeto2: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  contextoProblema2: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  imagemProb2: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  materialComplementar2: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  solucao2: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  etapasSolucao2: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  dica2: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  dicaColega2: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  resultado2: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  imagemResul2: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  }
}, {
  tableName: 'desafionivel2',
  timestamps: false
});

module.exports = DesafioNivel2;
