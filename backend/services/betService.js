// backend/services/betService.js
require('dotenv').config();
const { Bet, User } = require('../models');
const { sendTelegramNotification } = require('./telegramService');

const commissionRate = 0.05; // 5% commission

/**
 * Расчет коэффициентов ставок.
 * Для UP: coef_up = 1 + (totalDown * (1 - commissionRate)) / totalUp (если totalUp > 0, иначе 0)
 * Для DOWN: coef_down = 1 + (totalUp * (1 - commissionRate)) / totalDown (если totalDown > 0, иначе 0)
 */
async function calculateCoefficient() {
  const upBets = await Bet.findAll({ where: { betDirection: 'up', status: 'pending' } });
  const downBets = await Bet.findAll({ where: { betDirection: 'down', status: 'pending' } });
  
  const totalUp = upBets.reduce((sum, bet) => sum + bet.amount, 0);
  const totalDown = downBets.reduce((sum, bet) => sum + bet.amount, 0);

  const upCoefficient = totalUp > 0 ? 1 + (totalDown * (1 - commissionRate)) / totalUp : 0;
  const downCoefficient = totalDown > 0 ? 1 + (totalUp * (1 - commissionRate)) / totalDown : 0;
  
  return { up: upCoefficient, down: downCoefficient, totalUp, totalDown };
}

/**
 * Проверка коэффициента и отправка уведомления, если превышает порог.
 */
async function checkCoefficient(threshold = 2) {
  const coeff = await calculateCoefficient();
  let message = "";
  if (coeff.up >= threshold) {
    message += `High coefficient on UP side: ${coeff.up.toFixed(2)}x. Consider betting UP. `;
  }
  if (coeff.down >= threshold) {
    message += `High coefficient on DOWN side: ${coeff.down.toFixed(2)}x. Consider betting DOWN. `;
  }
  if (message) {
    await sendTelegramNotification(message);
  }
  return coeff;
}

module.exports = { calculateCoefficient, checkCoefficient };
