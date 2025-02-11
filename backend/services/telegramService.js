// backend/services/telegramService.js
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config(); // Если ещё не вызван в server.js, можно здесь

const botToken = process.env.TELEGRAM_BOT_TOKEN; // Должен содержать корректный токен
const chatId = process.env.TELEGRAM_CHAT_ID;      // Должен быть числовым ID (например, "123456789")

if (!botToken) {
  console.error("TELEGRAM_BOT_TOKEN is not set in .env");
  process.exit(1);
}

const bot = new TelegramBot(botToken, { polling: true });

bot.on('polling_error', (error) => {
  console.error(`Polling error: ${error.code} - ${error.message}`);
});

function sendTelegramNotification(message) {
  bot.sendMessage(chatId, message)
    .then(() => console.log('Notification sent to Telegram'))
    .catch(err => console.error('Error sending Telegram notification:', err));
}

module.exports = { sendTelegramNotification };
