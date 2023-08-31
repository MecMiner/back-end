const {Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const Usuario = db.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  pontos: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0 
  },
  XP: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0 
  },
  colaboracao: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0 
  },
  bomDesempenho: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0 
  },
  otimoDesempenho: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0 
  }
}, {
  tableName: 'usuario', // Nome da tabela no banco de dados (se necessário)
  timestamps: false // Define se serão criadas as colunas createdAt e updatedAt
});

// Exporte o modelo do Sequelize
Usuario.sync({alter: true});
module.exports = Usuario;
