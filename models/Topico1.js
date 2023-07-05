const {Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const Topico1 = db.define('Topico1', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(500),
    allowNull: false
  }
}, {
  tableName: 'topico1',
  timestamps: false
});

module.exports = Topico1;
