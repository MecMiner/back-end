const {Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const Tags = db.define('Tags', {
  Id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  TagName: {
    type: DataTypes.STRING(500),
    allowNull: false
  }
}, {
  tableName: 'tags',
  timestamps: false
});

module.exports = Tags;
