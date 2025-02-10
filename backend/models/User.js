// backend/models/User.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('User', {
    // Баланс в USDT; по умолчанию, например, 100 USDT
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 100,
    },
    // Другие поля, например, username, email, можно добавить при необходимости
  });
};
