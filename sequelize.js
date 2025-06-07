require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:12345678@127.0.0.1:5432/power', {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
});

module.exports = sequelize;
