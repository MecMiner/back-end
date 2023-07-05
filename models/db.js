const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('heroku_1b0a3702f94d3e4', 'bf5527b4278548', 'ccd84a87', {
    host: 'us-cdbr-east-06.cleardb.net',
    dialect: 'mysql'
  });

sequelize.authenticate().then(() => {
    console.log("Conexão com banco de dados realizada com sucesso");
}).catch(() => {
    console.log("Conexão com banco de dados não realizada com sucesso");
})

  module.exports = sequelize;