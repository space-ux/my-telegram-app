// backend/models/index.js
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const config = require('config');

const dbConfig = config.get('database');
const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  storage: dbConfig.storage,
});

// Определяем модель ставки
const Bet = sequelize.define('Bet', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  result: {
    type: DataTypes.STRING,
  },
  betDirection: {
    type: DataTypes.STRING, // "up" или "down"
    allowNull: false,
  },
  betRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Импортируем модель User
const User = require('./User')(sequelize);

// Синхронизируем модели (в разработке можно использовать { alter: true } для корректировки схем)
sequelize.sync();

module.exports = { sequelize, Bet, User };
