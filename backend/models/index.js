// backend/models/index.js
require('dotenv').config(); // Загружаем переменные окружения из файла .env

const { Sequelize, DataTypes } = require('sequelize');

// Считываем переменные окружения
const dialect = process.env.DATABASE_DIALECT || 'sqlite';
const storage = process.env.DATABASE_STORAGE || 'database.sqlite';

// Инициализируем Sequelize
const sequelize = new Sequelize({
  dialect: dialect,
  storage: storage
});

// Определение модели ставки
const Bet = sequelize.define('Bet', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  },
  result: {
    type: DataTypes.STRING
  },
  betDirection: {
    type: DataTypes.STRING, // "up" или "down"
    allowNull: false
  },
  betRate: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

// Если у вас есть модель пользователя, подключите её тоже:
const User = require('./User')(sequelize); // Предполагается, что файл User.js экспортирует функцию

// Синхронизация моделей с базой данных
sequelize.sync();

module.exports = { sequelize, Bet, User };
