const {Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const Topico3 = db.define('Topico3', {
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
  tableName: 'topico3',
  timestamps: false
});

module.exports = Topico3;
