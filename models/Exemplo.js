const {Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const Exemplo = db.define('Exemplo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  conhecimento: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  sugestoes: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  nome: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  linguagem: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  linkproj: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  linkex: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false
  },
  contexto: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  problema: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  imagemprob: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  solucao: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  imagemsolu: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  resultado: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  imagemresul: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  referencias: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  topico1: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  topico2: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  topico3: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  outro: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  tag1: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  tag2: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  tag3: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'exemplo',
  timestamps: false
});

module.exports = Exemplo;
