// backend/routes/index.js
const express = require('express');
const router = express.Router();

// Импорт необходимых функций из сервисов
const { getDollarRate } = require('../services/rateService');
const { getCachedRate } = require('../services/rateCache');
const { calculateCoefficient } = require('../services/betService');
const walletService = require('../services/walletService');

// Эндпоинт для получения данных пользователя
// Для демонстрации возвращает тестового пользователя с балансом 100 USDT.
router.get('/user/:id', (req, res) => {
  res.json({ id: req.params.id, balance: 100, name: "Test User" });
});

// Эндпоинт для получения курса (из кэша, обновляемого периодически)
router.get('/rate', (req, res) => {
  const rate = getCachedRate();
  if (rate !== null) {
    res.json({ rate });
  } else {
    // Если кэш ещё не заполнен, пробуем получить свежий курс напрямую
    getDollarRate()
      .then((freshRate) => res.json({ rate: freshRate }))
      .catch((error) => res.status(500).json({ error: error.message }));
  }
});

// Эндпоинт для получения коэффициентов ставок (рассчитывается на основе pending ставок)
router.get('/coefficient', async (req, res) => {
  try {
    const coeff = await calculateCoefficient();
    res.json({ up: coeff.up, down: coeff.down });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Эндпоинт для создания инвойса ставки (попытка интеграции с TMA Wallet)
// Здесь вы можете заменить заглушку реальным вызовом TMA Wallet API.
router.post('/createBetInvoice', async (req, res) => {
  try {
    const { direction, userAmount } = req.body;
    if (!direction || !userAmount) {
      return res.status(400).json({ error: "direction and userAmount are required" });
    }
    // Заглушка: формирование ссылки для оплаты
    const invoice_url = `https://example.com/invoice?direction=${direction}&amount=${userAmount}`;
    res.json({ invoice_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Эндпоинт для пополнения баланса (Deposit)
// Здесь можно реализовать вызов TMA Wallet API для создания платежного инвойса.
router.post('/deposit', async (req, res) => {
  try {
    const { userId, amount } = req.body;
    if (!userId || !amount) {
      return res.status(400).json({ error: "userId and amount are required" });
    }
    // Заглушка: формирование ссылки для пополнения
    const depositInvoiceUrl = `https://example.com/deposit?userId=${userId}&amount=${amount}`;
    res.json({ paymentUrl: depositInvoiceUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Эндпоинт для вывода средств (Withdraw)
// Здесь можно реализовать вызов TMA Wallet API для создания запроса на вывод.
router.post('/withdraw', async (req, res) => {
  try {
    const { userId, amount, walletAddress } = req.body;
    if (!userId || !amount || !walletAddress) {
      return res.status(400).json({ error: "userId, amount, and walletAddress are required" });
    }
    // Заглушка: имитация успешного запроса на вывод средств
    res.json({ message: "Withdraw request submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Эндпоинт для обработки webhook уведомлений от TMA Wallet
router.post('/wallet-webhook', async (req, res) => {
  try {
    // Передаем объект req и res в функцию обработки вебхука
    await walletService.handleWalletWebhook(req, res);
    // Функция handleWalletWebhook должна отправить ответ (например, res.sendStatus(200))
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
