// db.js
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('aidb', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, // optional
});

module.exports = sequelize;
