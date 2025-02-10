// backend/services/telegramService.js
require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const config = require('config');

// Получаем настройки Telegram из конфигурации
const botToken = config.get('telegram.botToken');
const chatId = config.get('telegram.chatId');

const bot = new TelegramBot(botToken, { polling: true });

bot.on('polling_error', (error) => {
  console.error(`Polling error: ${error.code} - ${error.message}`);
});

function sendTelegramNotification(message) {
  bot.sendMessage(chatId, message)
    .then(() => console.log('Уведомление отправлено в Telegram'))
    .catch(err => console.error('Ошибка отправки уведомления:', err));
}

module.exports = { sendTelegramNotification };
