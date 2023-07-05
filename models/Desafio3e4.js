const {Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const DesafioNivel3e4 = db.define('DesafioNivel3e4', {
  iddesafio3e4: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  idexemploNivel3: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  dadosProj3: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  descProblema3: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  nomeProjeto3: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  contextoProblema3: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  imagemProb3: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  materialComplementar3: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  solucao3: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  etapasSolucao3: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  dica3: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  dicaColega3: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  resultado3: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  imagemResul3: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  linkNivel4: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  }
}, {
  tableName: 'desafionivel3e4',
  timestamps: false
});

module.exports = DesafioNivel3e4;
