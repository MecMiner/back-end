const {Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const Respostas = db.define('Respostas', {
  iddesafio: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  idusuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: true
  },
  nivel :{
    type: DataTypes.INTEGER,
    allowNull: true
  },
  respostanivel2: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  respostanivel3: {
    type: DataTypes.TEXT('medium'),
    allowNull: true
  },
  respostanivel4: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  statusNivel2: {
    type: DataTypes.TEXT('medium'),
    allowNull: true,
    get() {
      const value = this.getDataValue('statusNivel2');
      return value ? JSON.parse(value) : null;
    },
    set(value) {
      this.setDataValue('statusNivel2', JSON.stringify(value));
    },
  },
  statusNivel3: {
    type: DataTypes.TEXT('medium'),
    allowNull: true,
    get() {
      const value = this.getDataValue('statusNivel3');
      return value ? JSON.parse(value) : null;
    },
    set(value) {
      this.setDataValue('statusNivel3', JSON.stringify(value));
    },
  },
  statusNivel4: {
    type: DataTypes.TEXT('medium'),
    allowNull: true,
    get() {
      const value = this.getDataValue('statusNivel4');
      return value ? JSON.parse(value) : null;
    },
    set(value) {
      this.setDataValue('statusNivel4', JSON.stringify(value));
    },
  },
  pontos: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  xp: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  bomDesempenho: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  otimoDesempenho: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  colaboracao: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'respostas',
  timestamps: false
});
//Respostas.sync({alter: true});
module.exports = Respostas;
