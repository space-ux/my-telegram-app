// backend/controllers/betController.js
require('dotenv').config();
const { Bet } = require('../models');
const telegramService = require('../services/telegramService');

exports.createBet = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const bet = await Bet.create({ userId, amount, status: 'pending' });

    // Отправляем уведомление в Telegram
    telegramService.sendTelegramNotification(`Новая ставка создана: ID ${bet.id}, сумма: ${bet.amount}`);

    res.status(201).json(bet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBetResult = async (req, res) => {
  try {
    const bet = await Bet.findByPk(req.params.id);
    if (!bet) return res.status(404).json({ error: 'Ставка не найдена' });
    res.status(200).json(bet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
