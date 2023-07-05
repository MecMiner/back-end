const {Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const Topico2 = db.define('Topico2', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  associacao: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'topico2',
  timestamps: false
});

module.exports = Topico2;

