const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('um30sck81weh5sur', 'bw5s260i42hh87z1', 'c2o6ec9pdivi2qgn', {
    host: 'qbhol6k6vexd5qjs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    port: 3306
  });

sequelize.authenticate().then(() => {
    console.log("Conexão com banco de dados realizada com sucesso");
}).catch(() => {
    console.log("Conexão com banco de dados não realizada com sucesso");
})

  module.exports = sequelize;