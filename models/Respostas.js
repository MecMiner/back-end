const {Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const Respostas = db.define('Respostas', {
  idRespostas: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  iddesafio: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  idusuario: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.TEXT('medium'),
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
  }
}, {
  tableName: 'respostas',
  timestamps: false
});
//Respostas.sync({alter: true});
module.exports = Respostas;
