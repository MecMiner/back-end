const {Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const Depoimento = db.define('Depoimento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_exemplo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comentario: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  data: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  estrela: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'depoimentos',
  timestamps: false
});

module.exports = Depoimento;