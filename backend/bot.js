// backend/bot.js
const telegramService = require('./services/telegramService');

function startBot() {
  console.log('Запуск Telegram-бота...');
  // Отправляем приветственное сообщение при старте
  telegramService.sendTelegramNotification('Привет! Бот запущен и готов к работе.');
}

startBot();
