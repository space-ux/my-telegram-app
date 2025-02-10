// backend/services/walletService.js
const telegramService = require('./telegramService');

async function handleWalletWebhook(req, res) {
  try {
    console.log('Получен вебхук от TMA Wallet:', req.body);
    telegramService.sendTelegramNotification(`Получен вебхук от TMA Wallet: ${JSON.stringify(req.body)}`);
    res.sendStatus(200);
  } catch (error) {
    console.error('Ошибка обработки вебхука:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { handleWalletWebhook };
